import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "The Heaven Experience — Heaven Aesthetics" },
      {
        name: "description",
        content:
          "More than a treatment. Consult, personalize, experience and maintain — the four stages of the Heaven Experience.",
      },
      { property: "og:title", content: "The Heaven Experience — Heaven Aesthetics" },
      {
        property: "og:description",
        content: "Consult, personalize, experience and maintain your skin journey.",
      },
    ],
  }),
  component: ExperiencePage,
});

const stages = [
  { n: "01", title: "Consult", copy: "Understand your skin. We listen before we recommend." },
  { n: "02", title: "Personalize", copy: "Choose what works for you — never a fixed template." },
  { n: "03", title: "Experience", copy: "Relax. Reset. Rejuvenate, in a space made for calm." },
  { n: "04", title: "Maintain", copy: "Continue your skin journey with guided aftercare." },
];

const rituals = [
  { title: "The Glow Ritual", copy: "Facial + Brow + Lash" },
  { title: "The Bridal Ritual", copy: "Pre-event skin + Beauty" },
  { title: "The Renewal Ritual", copy: "Advanced treatment + Facial + Aftercare" },
];

function ExperiencePage() {
  return (
    <main className="bg-background pt-32">
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <Reveal>
          <p className="eyebrow">The Heaven Experience</p>
          <h1 className="display mt-8 text-6xl md:text-8xl">
            More than a treatment.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 lg:px-12">
        <div className="grid gap-px bg-border-gold md:grid-cols-4">
          {stages.map((stage, i) => (
            <Reveal key={stage.n} delay={i * 100}>
              <div className="h-full bg-background p-10">
                <span className="display text-5xl text-gold">{stage.n}</span>
                <h2 className="mt-8 text-[0.7rem] font-semibold tracking-[0.28em] uppercase">
                  {stage.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{stage.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-28 text-ink-foreground">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <p className="eyebrow">Curated Combinations</p>
            <h2 className="display mt-6 text-5xl md:text-7xl">The Heaven Rituals</h2>
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {rituals.map((ritual, i) => (
              <Reveal key={ritual.title} delay={i * 120}>
                <div className="border-t border-border-gold pt-8">
                  <h3 className="display text-3xl">{ritual.title}</h3>
                  <p className="mt-3 text-sm tracking-[0.14em] text-ink-foreground/50 uppercase">
                    {ritual.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
