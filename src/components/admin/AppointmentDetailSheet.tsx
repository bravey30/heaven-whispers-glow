import type { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Appointment } from "@/lib/booking-schema";

export function AppointmentDetailSheet({
  appointment,
  onOpenChange,
}: {
  appointment: Appointment | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={!!appointment} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-lg">
        {appointment && (
          <>
            <SheetHeader>
              <SheetTitle>{appointment.full_name}</SheetTitle>
              <SheetDescription>
                {appointment.service_name} — {appointment.appointment_date} at{" "}
                {appointment.appointment_time}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6 text-sm">
              <DetailSection title="Contact">
                <Row label="Phone" value={appointment.phone} />
                <Row label="Email" value={appointment.email} />
                <Row label="Age" value={appointment.age} />
              </DetailSection>

              <DetailSection title="Skin Profile">
                <Row label="Skin type" value={appointment.skin_type} />
                <Row label="Main concern" value={appointment.main_concern} />
                <Row label="Skin goals" value={appointment.skin_goals} />
                <Row label="Current products" value={appointment.current_products} />
                <Row label="Last facial" value={appointment.last_facial_date} />
              </DetailSection>

              <DetailSection title="Health & Safety">
                <Row label="Allergies" value={appointment.allergies} />
                <Row label="Medication" value={appointment.current_medication} />
                <Row label="Pregnant / breastfeeding" value={appointment.pregnancy_status} />
              </DetailSection>

              {(appointment.payment_account || appointment.payment_sender_name) && (
                <DetailSection title="Payment">
                  <Row label="Paid to" value={appointment.payment_account} />
                  <Row label="Sender name" value={appointment.payment_sender_name} />
                </DetailSection>
              )}

              {appointment.notes && (
                <DetailSection title="Notes">
                  <p>{appointment.notes}</p>
                </DetailSection>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
