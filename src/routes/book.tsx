import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Reveal } from "@/components/site/Reveal";
import { StepIndicator } from "@/components/booking/StepIndicator";
import { ServiceStep } from "@/components/booking/ServiceStep";
import { DateTimeStep } from "@/components/booking/DateTimeStep";
import { ConsultationStep } from "@/components/booking/ConsultationStep";
import { PaymentStep } from "@/components/booking/PaymentStep";
import { ConfirmStep } from "@/components/booking/ConfirmStep";
import { Button } from "@/components/ui/button";
import { bookingSchema, type BookingInput } from "@/lib/booking-schema";
import { submitAppointment } from "@/lib/appointments.server";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Heaven Aesthetics" },
      {
        name: "description",
        content:
          "Book your Heaven Aesthetics appointment in Dodoma — choose your treatment, pick a time, and tell us about your skin.",
      },
    ],
  }),
  component: BookPage,
});

const STEP_FIELDS: Partial<Record<number, Array<keyof BookingInput>>> = {
  1: ["serviceSlug"],
  2: ["appointmentDate", "appointmentTime"],
  3: ["fullName", "phone", "email", "mainConcern"],
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "slot_taken" }
  | { status: "error"; message: string };

function BookPage() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  const form = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceSlug: "",
      appointmentDate: "",
      appointmentTime: "",
      fullName: "",
      phone: "",
      email: "",
      mainConcern: "",
      skinGoals: "",
      currentProducts: "",
      lastFacialDate: "",
      allergies: "",
      currentMedication: "",
      notes: "",
      paymentAccountProvider: "",
      paymentSenderName: "",
    },
  });

  const values = form.watch();

  async function goNext() {
    const fields = STEP_FIELDS[step];
    if (fields) {
      const valid = await form.trigger(fields);
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, 5));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function onSubmit(data: BookingInput) {
    setSubmitState({ status: "submitting" });
    try {
      const result = await submitAppointment({ data });
      if (!result.ok) {
        setSubmitState({ status: "slot_taken" });
        return;
      }
      setSubmitState({ status: "success" });
    } catch (err) {
      setSubmitState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <main className="bg-background pt-32">
        <section className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-12">
          <p className="eyebrow">Received</p>
          <h1 className="display mt-6 text-5xl md:text-6xl">Thank you.</h1>
          <p className="mt-6 text-muted-foreground">
            Your appointment request has been received. We'll be in touch shortly to confirm.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background pt-32">
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-12">
        <Reveal>
          <p className="eyebrow">Your skin journey starts here</p>
          <h1 className="display mt-4 text-5xl md:text-7xl">Book an Appointment</h1>
        </Reveal>

        <div className="mt-16 border border-border p-6 md:p-10">
          <StepIndicator current={step} />

          {step === 1 && (
            <ServiceStep
              selectedSlug={values.serviceSlug || null}
              onSelect={(slug) => form.setValue("serviceSlug", slug, { shouldValidate: true })}
            />
          )}

          {step === 2 && (
            <DateTimeStep
              date={selectedDate}
              time={values.appointmentTime || null}
              onChangeDate={(date) => {
                setSelectedDate(date);
                form.setValue("appointmentDate", date ? format(date, "yyyy-MM-dd") : "", {
                  shouldValidate: true,
                });
              }}
              onChangeTime={(time) =>
                form.setValue("appointmentTime", time, { shouldValidate: true })
              }
            />
          )}

          {step === 3 && <ConsultationStep form={form} />}

          {step === 4 && <PaymentStep form={form} />}

          {step === 5 && <ConfirmStep values={values} />}

          {submitState.status === "slot_taken" && (
            <p className="mt-6 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
              That time slot was just taken by someone else. Please go back and choose another time.
            </p>
          )}
          {submitState.status === "error" && (
            <p className="mt-6 border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
              {submitState.message}
            </p>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-border pt-8">
            <Button type="button" variant="outline" onClick={goBack} disabled={step === 1}>
              Back
            </Button>

            {step < 5 && (
              <button type="button" className="btn-gold" onClick={goNext}>
                Continue →
              </button>
            )}
            {step === 5 && (
              <button
                type="button"
                className="btn-gold"
                disabled={submitState.status === "submitting"}
                onClick={form.handleSubmit(onSubmit)}
              >
                {submitState.status === "submitting" ? "Booking…" : "Confirm Appointment →"}
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
