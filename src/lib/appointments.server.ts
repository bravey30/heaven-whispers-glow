import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { treatments } from "@/lib/heaven";
import { appointmentStatuses, bookingSchema, type Appointment } from "@/lib/booking-schema";
import { getSupabaseAdmin } from "./server/supabase";
import { renderAppointmentPdf } from "./server/pdf";
import { sendAdminNotification, sendCustomerConfirmation } from "./server/email";
import { requireAdminSession } from "./server/session";

export const getBookedSlotsForDate = createServerFn({ method: "GET" })
  .validator((input: unknown) =>
    z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }).parse(input),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseAdmin();
    const { data: rows, error } = await supabase
      .from("appointments")
      .select("appointment_time")
      .eq("appointment_date", data.date)
      .neq("status", "cancelled");

    if (error) throw new Error(error.message);
    return (rows ?? []).map((row) => row.appointment_time as string);
  });

export const submitAppointment = createServerFn({ method: "POST" })
  .validator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const treatment = treatments.find((t) => t.slug === data.serviceSlug);
    if (!treatment) throw new Error("Unknown service.");

    const supabase = getSupabaseAdmin();
    const { data: row, error } = await supabase
      .from("appointments")
      .insert({
        service_slug: treatment.slug,
        service_name: treatment.name,
        service_price: treatment.price,
        appointment_date: data.appointmentDate,
        appointment_time: data.appointmentTime,
        full_name: data.fullName,
        phone: data.phone,
        email: data.email ?? null,
        notes: data.notes ?? null,
        age: data.age ?? null,
        skin_type: data.skinType ?? null,
        main_concern: data.mainConcern,
        skin_goals: data.skinGoals ?? null,
        current_products: data.currentProducts ?? null,
        last_facial_date: data.lastFacialDate ?? null,
        allergies: data.allergies ?? null,
        current_medication: data.currentMedication ?? null,
        pregnancy_status: data.pregnancyStatus ?? null,
        payment_reference: data.paymentReference ?? null,
      })
      .select()
      .single();

    if (error) {
      // Unique violation on (appointment_date, appointment_time) — someone
      // else just took this slot.
      if (error.code === "23505") {
        return { ok: false as const, reason: "slot_taken" as const };
      }
      throw new Error(error.message);
    }

    const appointment = row as Appointment;

    // The booking is already saved — a bad SMTP password or a PDF hiccup
    // must never turn a successful booking into an error for the customer.
    try {
      const pdfBuffer = await renderAppointmentPdf(appointment);
      await sendAdminNotification(appointment, pdfBuffer);
    } catch (err) {
      console.error("Failed to send admin notification email:", err);
    }
    try {
      await sendCustomerConfirmation(appointment);
    } catch (err) {
      console.error("Failed to send customer confirmation email:", err);
    }

    return { ok: true as const, appointment };
  });

export const listAppointments = createServerFn({ method: "GET" })
  .validator((input: unknown) =>
    z
      .object({
        status: z.enum(appointmentStatuses).optional(),
        from: z.string().optional(),
        to: z.string().optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();

    const supabase = getSupabaseAdmin();
    let query = supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: false })
      .order("appointment_time", { ascending: false });

    if (data.status) query = query.eq("status", data.status);
    if (data.from) query = query.gte("appointment_date", data.from);
    if (data.to) query = query.lte("appointment_date", data.to);

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    return (rows ?? []) as Appointment[];
  });

export const updateAppointmentStatus = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(appointmentStatuses) }).parse(input),
  )
  .handler(async ({ data }) => {
    await requireAdminSession();

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("appointments")
      .update({ status: data.status })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
