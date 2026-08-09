import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import { treatments } from "../lib/heaven";
import catSkin from "../assets/cat-skin.jpg";
import catAdvanced from "../assets/cat-advanced.jpg";
import catBeauty from "../assets/cat-beauty.jpg";
import catBody from "../assets/cat-body.jpg";

const images: Record<string, string> = {
  skin: catSkin,
  advanced: catAdvanced,
  beauty: catBeauty,
  body: catBody,
};

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const treatment = treatments.find((t) => t.slug === params.slug);
    if (!treatment) throw notFound();
    return { treatment };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Treatment unavailable — Heaven Aesthetics" }, { name: "robots", content: "noindex" }],
      };
    }
    const { treatment } = loaderData;
    const title = `${treatment.signature} · ${treatment.name} — Heaven Aesthetics`;
    return {
      meta: [
        { title },
        { name: "description", content: treatment.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: treatment.summary },
      ],
    };
  },
  component: TreatmentDetail,
});

const stages = ["Consultation", "Preparation", "Treatment", "Aftercare"];

function TreatmentDetail() {
  const { treatment } = Route.useLoaderData();

  return (
    <main className="bg-background">
      <section className="relative bg-ink pt-32 text-ink-foreground">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-12">
          <Reveal>
            <p className="eyebrow">{treatment.name}</p>
            <h1 className="display mt-6 text-6xl md:text-8xl">{treatment.signature}</h1>
            <p className="mt-8 text-lg text-gold">{treatment.price}</p>
            <p className="mt-8 max-w-md leading-relaxed text-ink-foreground/60">
              {treatment.summary}
            </p>
            <div className="mt-12">
              <Link to="/contact" className="btn-gold">
                Book {treatment.signature} →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140} className="img-zoom">
            <img
              src={images[treatment.category]}
              alt={`${treatment.signature} treatment at Heaven Aesthetics`}
              loading="lazy"
              width={900}
              height={1200}
              className="h-[65vh] w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal>
            <h2 className="eyebrow">What it includes</h2>
            <ul className="mt-8 border-t border-border-gold">
              {treatment.includes.map((item: string) => (
                <li key={item} className="border-b border-border-gold py-5 text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="eyebrow">Ideal for</h2>
            <ul className="mt-8 border-t border-border-gold">
              {treatment.idealFor.map((item: string) => (
                <li key={item} className="border-b border-border-gold py-5 text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-28 text-ink-foreground">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <p className="eyebrow">The experience</p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-border-gold md:grid-cols-4">
            {stages.map((stage, i) => (
              <Reveal key={stage} delay={i * 100}>
                <div className="h-full bg-ink p-10">
                  <span className="display text-4xl text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-6 text-[0.7rem] font-semibold tracking-[0.28em] uppercase">
                    {stage}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-20">
            <Link to="/treatments" className="btn-gold">
              All Treatments →
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
