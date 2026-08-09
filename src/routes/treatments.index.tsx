import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "../components/site/Reveal";
import { categories, treatments } from "../lib/heaven";
import catSkin from "../assets/cat-skin.jpg";
import catAdvanced from "../assets/cat-advanced.jpg";
import catBeauty from "../assets/cat-beauty.jpg";
import catBody from "../assets/cat-body.jpg";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      { title: "Treatments — Heaven Aesthetics" },
      {
        name: "description",
        content:
          "Facials, advanced aesthetics, lash and brow artistry and body care. Explore the full Heaven Aesthetics treatment catalogue.",
      },
      { property: "og:title", content: "Treatments — Heaven Aesthetics" },
      {
        property: "og:description",
        content: "Your skin. Your journey. Explore the full Heaven treatment catalogue.",
      },
    ],
  }),
  component: TreatmentsPage,
});

const images: Record<string, string> = {
  skin: catSkin,
  advanced: catAdvanced,
  beauty: catBeauty,
  body: catBody,
};

function TreatmentsPage() {
  const [active, setActive] = useState<string>("all");
  const list =
    active === "all" ? treatments : treatments.filter((t) => t.category === active);

  return (
    <main className="bg-background pt-32">
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <Reveal>
          <p className="eyebrow">Your skin. Your journey.</p>
          <h1 className="display mt-8 text-6xl md:text-8xl">Treatments</h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-10 lg:px-12">
        <div className="flex flex-wrap gap-x-10 gap-y-4 border-y border-border-gold py-6">
          {[{ key: "all", label: "All" }, ...categories].map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              className={`text-[0.68rem] font-medium tracking-[0.24em] uppercase transition-colors ${
                active === cat.key ? "text-gold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-32 lg:px-12">
        <div className="grid gap-px bg-border-gold sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 90}>
              <Link
                to="/treatments/$slug"
                params={{ slug: t.slug }}
                className="group flex h-full flex-col bg-background"
              >
                <div className="img-zoom">
                  <img
                    src={images[t.category]}
                    alt={`${t.signature} — ${t.name}`}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="h-72 w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-10">
                  <p className="eyebrow">{t.name}</p>
                  <h2 className="display mt-4 text-4xl transition-colors group-hover:text-gold">
                    {t.signature}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t.summary}
                  </p>
                  <div className="mt-8 flex items-center justify-between border-t border-border-gold pt-6">
                    <span className="text-sm tracking-[0.14em]">{t.price}</span>
                    <span className="text-[0.65rem] tracking-[0.24em] text-gold uppercase">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
