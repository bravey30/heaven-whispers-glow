-- Heaven Aesthetics — appointments table
-- Run in the Supabase project's SQL editor (Database → SQL Editor).
-- Safe to re-run: every statement is idempotent, so re-running it is also how
-- an existing database picks up later changes.

create extension if not exists pgcrypto;

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),

  -- service, copied from the catalog at booking time so later price/name
  -- edits never retroactively change a past booking's record
  service_slug text not null,
  service_name text not null,
  service_price text not null,

  -- schedule
  appointment_date date not null,
  appointment_time text not null, -- e.g. '14:00'
  duration_minutes integer not null default 60, -- treatment length, from the catalog

  -- client
  full_name text not null,
  phone text not null,
  email text,
  notes text,

  -- consultation / skin profile (image 5's intake form)
  age integer,
  skin_type text,
  main_concern text not null,
  skin_goals text,
  current_products text,
  last_facial_date text,
  allergies text,
  current_medication text,
  pregnancy_status text,

  -- deposit (informational — not required to complete a booking)
  payment_account text, -- which of your accounts (e.g. "CRDB", "Lipa M-PESA") they picked
  payment_sender_name text -- name that will show on your payment notification
);

-- Added after launch; existing rows get the old fixed 1-hour slot.
alter table appointments
  add column if not exists duration_minutes integer not null default 60;

-- Replaced by enforce_appointment_capacity() below: the old index allowed only
-- one booking per start time across all services and ignored duration.
drop index if exists uq_appointments_slot;

-- Each booking holds its service for duration_minutes + a 5-minute buffer, and
-- each service has 2 servers, so at most 2 bookings of the same service may
-- overlap at any moment. The app checks this before offering a time; this
-- trigger closes the race when two people book at once. Keep buffer_minutes
-- and capacity in sync with BUFFER_MINUTES / SERVERS_PER_SERVICE in
-- src/lib/booking-schema.ts.
create or replace function enforce_appointment_capacity()
returns trigger
language plpgsql
as $fn$
declare
  buffer_minutes constant integer := 5;
  capacity constant integer := 2;
  new_start time;
  new_end time;
  peak integer;
begin
  if new.status = 'cancelled' then
    return new;
  end if;

  -- Status changes like pending → confirmed don't move the booking.
  if tg_op = 'UPDATE'
     and old.status <> 'cancelled'
     and new.service_slug = old.service_slug
     and new.appointment_date = old.appointment_date
     and new.appointment_time = old.appointment_time
     and new.duration_minutes = old.duration_minutes then
    return new;
  end if;

  -- Serialize bookings for the same service and day so concurrent inserts
  -- can't both see a free server.
  perform pg_advisory_xact_lock(hashtext(new.service_slug || '|' || new.appointment_date::text));

  new_start := new.appointment_time::time;
  new_end := new_start + make_interval(mins => new.duration_minutes + buffer_minutes);

  peak := (
  with overlapping as (
    select appointment_time::time as s,
           appointment_time::time + make_interval(mins => duration_minutes + buffer_minutes) as e
    from appointments
    where service_slug = new.service_slug
      and appointment_date = new.appointment_date
      and status <> 'cancelled'
      and id <> new.id
  ),
  relevant as (
    select s, e from overlapping where s < new_end and new_start < e
  ),
  -- Peak concurrency is reached at the new start or at some booking's start.
  points as (
    select new_start as p
    union
    select s from relevant where s > new_start
  )
  select coalesce(max((select count(*) from relevant r where r.s <= points.p and points.p < r.e)), 0)
    from points
  );

  if peak >= capacity then
    raise exception 'No free server for % at % on %',
      new.service_slug, new.appointment_time, new.appointment_date
      using errcode = '23P01'; -- exclusion_violation; the app maps it to "slot taken"
  end if;

  return new;
end;
$fn$;

drop trigger if exists trg_appointments_capacity on appointments;
create trigger trg_appointments_capacity
  before insert or update on appointments
  for each row execute function enforce_appointment_capacity();

create index if not exists idx_appointments_service_date
  on appointments (service_slug, appointment_date);

create index if not exists idx_appointments_date on appointments (appointment_date);
create index if not exists idx_appointments_status on appointments (status);
create index if not exists idx_appointments_created_at on appointments (created_at desc);

-- Default-deny: RLS is on and no policies are defined, so only the
-- service-role key (used server-side only, never in the browser) can read or
-- write this table.
alter table appointments enable row level security;
