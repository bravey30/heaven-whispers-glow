import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";
import interior from "../assets/interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Heaven Aesthetics" },
      {
        name: "description",
        content:
          "Beauty is personal. Heaven Aesthetics is a boutique skin and aesthetics studio built around bespoke care and tranquil luxury.",
      },
      { property: "og:title", content: "About — Heaven Aesthetics" },
      {
        property: "og:description",
        content: "A boutique skin and aesthetics studio built around bespoke care.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Bespoke Care", copy: "Every treatment begins with your skin, not a menu." },
  { title: "Professional Excellence", copy: "Trained hands, considered products, honest guidance." },
  { title: "Tranquil Luxury", copy: "A calm, private space designed for stillness." },
];

function AboutPage() {
  return (
    <main className="bg-background pt-32">
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <Reveal>
          <p className="eyebrow">Welcome to Heaven</p>
          <h1 className="display mt-8 text-6xl md:text-8xl">Beauty is personal.</h1>
        </Reveal>
        <Reveal delay={120} className="mt-10 max-w-2xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            At Heaven Aesthetics, we believe exceptional beauty care begins with understanding the
            individual. We bring together personalized facial treatments, advanced aesthetics, lash
            and brow artistry, and body care within a sophisticated and tranquil environment.
          </p>
        </Reveal>
      </section>

      <section className="img-zoom mx-auto max-w-[1400px] px-6 lg:px-12">
        <img
          src={interior}
          alt="The Heaven Aesthetics studio interior in black and champagne gold"
          loading="lazy"
          width={1400}
          height={1000}
          className="h-[60vh] w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 120}>
              <div className="border-t border-border-gold pt-8">
                <h2 className="text-[0.7rem] font-semibold tracking-[0.28em] uppercase">
                  {value.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{value.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-20">
          <Link to="/treatments" className="btn-ink">
            Explore Treatments →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
