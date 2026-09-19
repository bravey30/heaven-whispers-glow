import { treatments } from "@/lib/heaven";
import type { BookingInput } from "@/lib/booking-schema";

export function ConfirmStep({ values }: { values: BookingInput }) {
  const treatment = treatments.find((t) => t.slug === values.serviceSlug);

  return (
    <div className="space-y-6">
      <div className="border border-border p-6">
        <SummaryRow label="Service" value={treatment?.name} />
        <SummaryRow label="Date" value={values.appointmentDate} />
        <SummaryRow label="Time" value={values.appointmentTime} />
        <SummaryRow label="Price" value={treatment?.price} accent />
      </div>
      <div className="border border-border p-6">
        <SummaryRow label="Full name" value={values.fullName} />
        <SummaryRow label="Phone" value={values.phone} />
        {values.email && <SummaryRow label="Email" value={values.email} />}
        <SummaryRow label="Main concern" value={values.mainConcern} />
      </div>
      {values.paymentReference && (
        <div className="border border-border p-6">
          <SummaryRow label="Payment reference" value={values.paymentReference} />
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        We'll review your details and confirm your appointment. You'll receive a confirmation email
        if you provided one.
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  accent,
}: {
  label: string;
  value?: string | undefined;
  accent?: boolean | undefined;
}) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className={accent ? "font-semibold text-gold" : "text-sm"}>{value}</span>
    </div>
  );
}
