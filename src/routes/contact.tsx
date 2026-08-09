import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "../components/site/Reveal";
import { treatments } from "../lib/heaven";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Heaven Aesthetics" },
      {
        name: "description",
        content:
          "Book your Heaven Aesthetics appointment in Dar es Salaam. Share your goals and we'll plan your skin journey.",
      },
      { property: "og:title", content: "Book an Appointment — Heaven Aesthetics" },
      {
        property: "og:description",
        content: "Plan your beauty journey with Heaven Aesthetics.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="bg-ink pt-32 text-ink-foreground">
      <section className="mx-auto grid max-w-[1400px] gap-20 px-6 py-24 lg:grid-cols-2 lg:px-12">
        <Reveal>
          <p className="eyebrow">Your skin journey starts here</p>
          <h1 className="display mt-8 text-6xl md:text-8xl">Welcome to Heaven.</h1>
          <p className="mt-8 max-w-md leading-relaxed text-ink-foreground/60">
            Share a few details and our team will be in touch to confirm your appointment and
            recommend the treatment best suited to your goals.
          </p>

          <div className="mt-16 space-y-6 border-t border-border-gold pt-10 text-sm text-ink-foreground/70">
            <p>
              <span className="eyebrow block">Studio</span>
              <span className="mt-2 block">Dar es Salaam, Tanzania</span>
            </p>
            <p>
              <span className="eyebrow block">Phone & WhatsApp</span>
              <a href="tel:+255700000000" className="mt-2 block link-gold hover:text-gold">
                +255 700 000 000
              </a>
            </p>
            <p>
              <span className="eyebrow block">Hours</span>
              <span className="mt-2 block">Mon – Sat · 09:00 – 19:00</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          {sent ? (
            <div className="border border-border-gold p-12">
              <p className="eyebrow">Received</p>
              <h2 className="display mt-6 text-4xl">Thank you.</h2>
              <p className="mt-4 text-sm text-ink-foreground/60">
                We'll be in touch shortly to confirm your appointment.
              </p>
            </div>
          ) : (
            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Field label="Name" name="name" />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" required={false} />
              <label className="block">
                <span className="eyebrow">Treatment of interest</span>
                <select
                  name="treatment"
                  className="mt-4 w-full border-b border-border-gold bg-transparent pb-3 text-sm text-ink-foreground outline-none focus:border-gold"
                >
                  <option className="bg-ink">No preference — advise me</option>
                  {treatments.map((t) => (
                    <option key={t.slug} className="bg-ink">
                      {t.signature} · {t.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="eyebrow">Your skin goals</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-4 w-full resize-none border-b border-border-gold bg-transparent pb-3 text-sm text-ink-foreground outline-none placeholder:text-ink-foreground/30 focus:border-gold"
                  placeholder="Tell us what you'd like to work on."
                />
              </label>
              <button type="submit" className="btn-gold">
                Book an Appointment →
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-4 w-full border-b border-border-gold bg-transparent pb-3 text-sm text-ink-foreground outline-none focus:border-gold"
      />
    </label>
  );
}
