import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Heaven Journal — Skin, Beauty & Rituals" },
      {
        name: "description",
        content:
          "Guidance on skin between treatments, lash and brow care, understanding aesthetic treatments, and everyday rituals.",
      },
      { property: "og:title", content: "The Heaven Journal" },
      {
        property: "og:description",
        content: "Skin, beauty, expertise and rituals from Heaven Aesthetics.",
      },
    ],
  }),
  component: JournalPage,
});

const entries = [
  {
    tag: "Skin",
    title: "How to maintain your skin between treatments",
    copy: "The habits that protect your results long after you leave the studio.",
  },
  {
    tag: "Beauty",
    title: "A considered guide to lashes and brows",
    copy: "Mapping, maintenance and knowing when to rest your natural lashes.",
  },
  {
    tag: "Expertise",
    title: "Understanding advanced aesthetic treatments",
    copy: "What microneedling, peels and carbon laser actually do for your skin.",
  },
  {
    tag: "Rituals",
    title: "Self-care as a practice, not a purchase",
    copy: "Building a slow, sustainable rhythm around your skin and wellbeing.",
  },
];

function JournalPage() {
  return (
    <main className="bg-background pt-32">
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <Reveal>
          <p className="eyebrow">Journal</p>
          <h1 className="display mt-8 text-6xl md:text-8xl">The Heaven Journal</h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-32 lg:px-12">
        <div className="border-t border-border-gold">
          {entries.map((entry, i) => (
            <Reveal key={entry.title} delay={i * 90}>
              <article className="group grid gap-6 border-b border-border-gold py-12 md:grid-cols-[160px_1fr_auto] md:items-baseline">
                <span className="eyebrow">{entry.tag}</span>
                <div>
                  <h2 className="display text-3xl transition-colors group-hover:text-gold md:text-4xl">
                    {entry.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm text-muted-foreground">{entry.copy}</p>
                </div>
                <span className="text-[0.65rem] tracking-[0.24em] text-gold uppercase">Read →</span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
