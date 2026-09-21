-- Heaven Aesthetics — appointments table
-- Run once in the Supabase project's SQL editor (Database → SQL Editor).

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

-- Prevents two bookings from ever holding the same slot, even under a race
-- (the app checks availability first, but only this closes the gap for good).
create unique index if not exists uq_appointments_slot
  on appointments (appointment_date, appointment_time)
  where status <> 'cancelled';

create index if not exists idx_appointments_date on appointments (appointment_date);
create index if not exists idx_appointments_status on appointments (status);
create index if not exists idx_appointments_created_at on appointments (created_at desc);

-- Default-deny: RLS is on and no policies are defined, so only the
-- service-role key (used server-side only, never in the browser) can read or
-- write this table.
alter table appointments enable row level security;
