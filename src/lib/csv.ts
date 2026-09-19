import type { Appointment } from "@/lib/booking-schema";

const COLUMNS: Array<{ key: keyof Appointment; label: string }> = [
  { key: "created_at", label: "Booked At" },
  { key: "status", label: "Status" },
  { key: "service_name", label: "Service" },
  { key: "service_price", label: "Price" },
  { key: "appointment_date", label: "Date" },
  { key: "appointment_time", label: "Time" },
  { key: "full_name", label: "Full Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "skin_type", label: "Skin Type" },
  { key: "main_concern", label: "Main Concern" },
];

function escapeCsvValue(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export function appointmentsToCsv(appointments: Appointment[]): string {
  const header = COLUMNS.map((c) => c.label).join(",");
  const rows = appointments.map((a) => COLUMNS.map((c) => escapeCsvValue(a[c.key])).join(","));
  return [header, ...rows].join("\n");
}

export function downloadTextFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
