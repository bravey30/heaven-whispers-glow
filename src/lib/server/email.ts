import nodemailer from "nodemailer";
import type { Appointment } from "@/lib/booking-schema";

let transporter: ReturnType<typeof nodemailer.createTransport> | undefined;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASSWORD must be set (see .env.example).");
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
  return transporter;
}

function fromAddress() {
  return process.env["SMTP_FROM"] || process.env["SMTP_USER"] || "";
}

function summaryLines(appt: Appointment): string {
  const lines: [string, string | number | null | undefined][] = [
    ["Treatment", appt.service_name],
    ["Price", appt.service_price],
    ["Date", appt.appointment_date],
    ["Time", appt.appointment_time],
    ["", ""],
    ["Full name", appt.full_name],
    ["Phone", appt.phone],
    ["Email", appt.email],
    ["Age", appt.age],
    ["", ""],
    ["Skin type", appt.skin_type],
    ["Main concern", appt.main_concern],
    ["Skin goals", appt.skin_goals],
    ["Current products", appt.current_products],
    ["Last facial treatment", appt.last_facial_date],
    ["Allergies / reactions", appt.allergies],
    ["Current medication", appt.current_medication],
    ["Pregnant / breastfeeding", appt.pregnancy_status],
    ["", ""],
    ["Payment reference", appt.payment_reference],
    ["Notes", appt.notes],
  ];

  return lines.map(([label, value]) => (label ? `${label}: ${value ?? "—"}` : "")).join("\n");
}

export async function sendAdminNotification(appt: Appointment, pdfBuffer?: Buffer) {
  const adminEmail = process.env["ADMIN_EMAIL"] || process.env["SMTP_USER"];
  if (!adminEmail) return;

  await getTransporter().sendMail({
    from: fromAddress(),
    to: adminEmail,
    subject: `New appointment — ${appt.full_name} — ${appt.appointment_date} ${appt.appointment_time}`,
    text: `A new appointment was booked on the website.\n\n${summaryLines(appt)}`,
    attachments: pdfBuffer
      ? [{ filename: `appointment-${appt.id}.pdf`, content: pdfBuffer }]
      : undefined,
  });
}

export async function sendCustomerConfirmation(appt: Appointment) {
  if (!appt.email) return;

  await getTransporter().sendMail({
    from: fromAddress(),
    to: appt.email,
    subject: "Your appointment with Heaven Aesthetics",
    text: `Hi ${appt.full_name},

Thank you for booking with Heaven Aesthetics. Here's what we have on file:

Treatment: ${appt.service_name}
Date: ${appt.appointment_date}
Time: ${appt.appointment_time}

We'll be in touch if we need anything else before your visit. See you soon!

Heaven Aesthetics
AVE MARIA SAUNA, Near Kamwana Express HQ, Ilazo, Dodoma, Tanzania
+255 797 868 749`,
  });
}
