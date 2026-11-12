import { z } from "zod";

export const skinTypes = ["oily", "dry", "combination", "sensitive"] as const;
export type SkinType = (typeof skinTypes)[number];

export const pregnancyStatuses = ["yes", "no", "not-applicable"] as const;
export type PregnancyStatus = (typeof pregnancyStatuses)[number];

// Mon–Sat, 09:00–19:00 — matches the hours already published on /contact.
export const BUSINESS_HOURS = { openHour: 9, closeHour: 19 };
export const CLOSED_WEEKDAY = 0; // date-fns getDay(): 0 = Sunday

// Scheduling rules. BUFFER_MINUTES and SERVERS_PER_SERVICE are also enforced
// by the enforce_appointment_capacity() trigger in supabase/schema.sql —
// change both together.
export const SLOT_INTERVAL_MINUTES = 30; // how often a start time is offered
export const BUFFER_MINUTES = 5; // turnover time added after every treatment
export const SERVERS_PER_SERVICE = 2; // bookings of one service that may overlap

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h! * 60 + m!;
}

function fromMinutes(total: number): string {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Start times at which a treatment of this length finishes by closing time. */
export function generateTimeSlots(durationMinutes: number): string[] {
  const slots: string[] = [];
  const close = BUSINESS_HOURS.closeHour * 60;
  for (
    let start = BUSINESS_HOURS.openHour * 60;
    start + durationMinutes <= close;
    start += SLOT_INTERVAL_MINUTES
  ) {
    slots.push(fromMinutes(start));
  }
  return slots;
}

export type BookedBlock = { time: string; durationMinutes: number };

/**
 * True when fewer than SERVERS_PER_SERVICE existing bookings are running at
 * any moment of the new booking (each booking holds its duration + buffer).
 * `existing` must already be limited to the same service and date.
 */
export function hasCapacity(time: string, durationMinutes: number, existing: BookedBlock[]): boolean {
  const start = toMinutes(time);
  const end = start + durationMinutes + BUFFER_MINUTES;
  const overlapping = existing
    .map((b) => {
      const s = toMinutes(b.time);
      return { s, e: s + b.durationMinutes + BUFFER_MINUTES };
    })
    .filter((b) => b.s < end && start < b.e);

  // Peak concurrency is reached at the new start or at some booking's start.
  const points = [start, ...overlapping.map((b) => b.s).filter((s) => s > start)];
  return points.every(
    (p) => overlapping.filter((b) => b.s <= p && p < b.e).length < SERVERS_PER_SERVICE,
  );
}

export const bookingSchema = z.object({
  serviceSlug: z.string().min(1, "Choose a service"),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date"),
  appointmentTime: z.string().regex(/^\d{2}:\d{2}$/, "Choose a time"),

  fullName: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),

  age: z.coerce.number().int().min(1).max(120).optional(),
  skinType: z.enum(skinTypes).optional(),
  mainConcern: z.string().trim().min(1, "Tell us your main skin concern"),
  skinGoals: z.string().trim().optional(),
  currentProducts: z.string().trim().optional(),
  lastFacialDate: z.string().trim().optional(),
  allergies: z.string().trim().optional(),
  currentMedication: z.string().trim().optional(),
  pregnancyStatus: z.enum(pregnancyStatuses).optional(),
  notes: z.string().trim().optional(),
  paymentAccountProvider: z.string().trim().optional(),
  paymentSenderName: z.string().trim().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const appointmentStatuses = ["pending", "confirmed", "completed", "cancelled"] as const;
export type AppointmentStatus = (typeof appointmentStatuses)[number];

export type Appointment = {
  id: string;
  created_at: string;
  status: AppointmentStatus;
  service_slug: string;
  service_name: string;
  service_price: string;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  full_name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  age: number | null;
  skin_type: string | null;
  main_concern: string | null;
  skin_goals: string | null;
  current_products: string | null;
  last_facial_date: string | null;
  allergies: string | null;
  current_medication: string | null;
  pregnancy_status: string | null;
  payment_account: string | null;
  payment_sender_name: string | null;
};
