import { z } from "zod";

export const skinTypes = ["oily", "dry", "combination", "sensitive"] as const;
export type SkinType = (typeof skinTypes)[number];

export const pregnancyStatuses = ["yes", "no", "not-applicable"] as const;
export type PregnancyStatus = (typeof pregnancyStatuses)[number];

// Mon–Sat, 09:00–19:00 — matches the hours already published on /contact.
// v1 gives every appointment a fixed 1-hour slot regardless of treatment
// (the catalog doesn't record real per-treatment durations for most services).
export const BUSINESS_HOURS = { openHour: 9, closeHour: 19 };
export const CLOSED_WEEKDAY = 0; // date-fns getDay(): 0 = Sunday

export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = BUSINESS_HOURS.openHour; hour < BUSINESS_HOURS.closeHour; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
  }
  return slots;
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
