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

  const filteredCategories =
    active === "all" ? categories : categories.filter((cat) => cat.key === active);

  return (
    <main className="bg-background pt-32">
      {/* Header Section */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <Reveal>
          <p className="eyebrow">Your skin. Your journey.</p>
          <h1 className="display mt-8 text-6xl md:text-8xl">Treatments</h1>
        </Reveal>
      </section>

      {/* Category Navigation Tabs */}
      <section className="mx-auto max-w-[1400px] px-6 pb-12 lg:px-12">
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

      {/* Categories Sections */}
      <div className="mx-auto max-w-[1400px] px-6 pb-32 lg:px-12 space-y-32">
        {filteredCategories.map((cat, i) => {
          const list = treatments.filter((t) => t.category === cat.key);
          const isEven = i % 2 === 0;

          return (
            <section key={cat.key} className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:items-start">
              {/* Category Image Column */}
              <div className={`img-zoom relative h-[50vh] min-h-[380px] w-full lg:h-[70vh] ${!isEven ? "lg:order-2" : ""}`}>
                <img
                  src={images[cat.key]}
                  alt={cat.label}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/10" />
              </div>

              {/* Treatment List Column */}
              <div className={`space-y-10 ${!isEven ? "lg:order-1" : ""}`}>
                <div>
                  <p className="eyebrow">{cat.sub}</p>
                  <h2 className="display mt-4 text-4xl md:text-5xl uppercase tracking-wide">
                    {cat.label}
                  </h2>
                </div>

                <div className="space-y-8 border-t border-border-gold/40 pt-8">
                  {list.map((t) => (
                    <Link
                      key={t.slug}
                      to="/treatments/$slug"
                      params={{ slug: t.slug }}
                      className="group block border-b border-border-gold/20 pb-8 transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="display text-2xl group-hover:text-gold transition-colors duration-300">
                          {t.signature}
                        </h3>
                        <span className="text-sm font-semibold tracking-wider text-gold">
                          {t.price}
                        </span>
                      </div>
                      <p className="mt-1 text-[0.62rem] tracking-widest text-muted-foreground uppercase font-medium">
                        {t.name}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-xl line-clamp-2">
                        {t.summary}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-[0.65rem] tracking-[0.24em] text-gold uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                        View Details →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
