import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "../components/site/Reveal";
import { categories, goals, recommendFor, treatments } from "../lib/heaven";
import hero from "../assets/hero.jpg";
import advanced from "../assets/advanced.jpg";
import interior from "../assets/interior.jpg";
import catSkin from "../assets/cat-skin.jpg";
import catAdvanced from "../assets/cat-advanced.jpg";
import catBeauty from "../assets/cat-beauty.jpg";
import catBody from "../assets/cat-body.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Heaven Aesthetics — Healthy Skin. Elevated Beauty." },
      {
        name: "description",
        content:
          "Premium aesthetics and skin wellness. Personalized facials, advanced treatments, lash and brow artistry and body care in Dodoma.",
      },
      { property: "og:title", content: "Heaven Aesthetics — Healthy Skin. Elevated Beauty." },
      {
        property: "og:description",
        content: "Welcome to Heaven. Personalized aesthetics and beauty treatments designed around you.",
      },
    ],
  }),
  component: Index,
});

const categoryImages: Record<string, string> = {
  skin: catSkin,
  advanced: catAdvanced,
  beauty: catBeauty,
  body: catBody,
};

const signature = ["basic-glow-facial", "hydrofacial", "firming-peptide-facial", "microneedling"]
  .map((slug) => treatments.find((t) => t.slug === slug)!)
  .filter(Boolean);

const testimonials = [
  {
    quote: "The entire experience felt so personal. I left feeling completely refreshed.",
    name: "Heaven Client",
  },
  {
    quote: "My skin has never looked this calm and even. They actually listen.",
    name: "Heaven Client",
  },
  {
    quote: "It doesn't feel like a salon. It feels like somewhere I go for myself.",
    name: "Heaven Client",
  },
];

const stages = [
  { n: "01", title: "Consult", copy: "Understand your skin." },
  { n: "02", title: "Personalize", copy: "Choose what works for you." },
  { n: "03", title: "Experience", copy: "Relax. Reset. Rejuvenate." },
  { n: "04", title: "Maintain", copy: "Continue your skin journey." },
];

function Index() {
  return (
    <main>
      <Hero />
      <Intro />
      <HeavenEdit />
      <Explorer />
      <Finder />
      <ExperienceSection />
      <AdvancedSection />
      <Results />
      <Rituals />
      <Bridal />
      <AboutStrip />
      <JournalStrip />
      <InstagramStrip />
      <FinalCta />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-ink text-ink-foreground">
      <span
        aria-hidden
        className="display pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[42vw] leading-none tracking-tight text-ink-foreground opacity-[0.06] select-none"
      >
        H
      </span>

      <div className="relative mx-auto grid min-h-screen max-w-[1400px] items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-2 lg:px-12">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow">Heaven Aesthetics</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="display mt-8 text-6xl sm:text-7xl lg:text-8xl">
              Healthy Skin.
              <br />
              <span className="italic">Elevated Beauty.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-10 max-w-md leading-relaxed text-ink-foreground/60">
              Personalized aesthetics and beauty treatments designed around you.
            </p>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <Link to="/contact" className="btn-gold">
                Book an Appointment →
              </Link>
              <a
                href="#the-heaven-edit"
                className="link-gold text-[0.68rem] font-medium tracking-[0.24em] text-ink-foreground/70 uppercase hover:text-gold"
              >
                Explore Treatments ↓
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="order-1 lg:order-2">
          <div className="img-zoom">
            <img
              src={hero}
              alt="Editorial portrait of a woman with radiant, healthy skin"
              width={1280}
              height={1600}
              className="h-[52vh] w-full object-cover object-top lg:h-[82vh]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">Welcome to Heaven</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display mt-8 text-5xl md:text-6xl">
            A space created for skin, beauty and you.
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-10 leading-relaxed text-muted-foreground">
            Heaven Aesthetics brings together personalized facial treatments, advanced aesthetics,
            lash and brow artistry, and body care within a sophisticated and tranquil environment.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-12">
            <Link to="/about" className="btn-ink">
              Discover Heaven →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeavenEdit() {
  return (
    <section id="the-heaven-edit" className="bg-background pb-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <div className="rule-gold" />
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Our signature treatments</p>
              <h2 className="display mt-6 text-5xl md:text-7xl">The Heaven Edit</h2>
            </div>
            <Link
              to="/treatments"
              className="link-gold text-[0.68rem] tracking-[0.24em] uppercase hover:text-gold"
            >
              View all →
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px bg-border-gold sm:grid-cols-2 lg:grid-cols-4">
          {signature.map((t, i) => (
            <Reveal key={t.slug} delay={i * 110}>
              <Link
                to="/treatments/$slug"
                params={{ slug: t.slug }}
                className="group flex h-full flex-col bg-background p-10 transition-transform duration-700 hover:-translate-y-1"
              >
                <span className="display text-4xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-10 text-4xl uppercase transition-colors group-hover:text-gold">
                  {t.signature}
                </h3>
                <p className="mt-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {t.name}
                </p>
                <p className="mt-10 flex-1 text-sm">{t.price}</p>
                <span className="mt-10 text-[0.65rem] tracking-[0.24em] text-gold uppercase">
                  Explore →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explorer() {
  return (
    <section className="bg-background pb-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow">The catalogue</p>
          <h2 className="display mt-6 text-5xl md:text-7xl">Your skin. Your journey.</h2>
        </Reveal>
        <div className="mt-16 grid gap-px bg-border-gold sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 110}>
              <Link
                to="/treatments"
                className="group img-zoom relative block h-[60vh] min-h-[420px] bg-ink"
              >
                <img
                  src={categoryImages[cat.key]}
                  alt={cat.sub}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="h-full w-full object-cover opacity-70 transition-opacity duration-700 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-10 text-ink-foreground">
                  <h3 className="display text-[clamp(2rem,3vw,3rem)] tracking-[0.04em] uppercase">{cat.label}</h3>
                  <p className="mt-3 text-xs tracking-[0.2em] text-ink-foreground/70 uppercase">
                    {cat.sub}
                  </p>
                  <span className="mt-8 block text-[0.65rem] tracking-[0.24em] text-gold uppercase">
                    Explore →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Finder() {
  const [goal, setGoal] = useState<string | null>(null);
  const recommendation = goal ? recommendFor(goal) : null;

  return (
    <section className="bg-ink py-32 text-ink-foreground">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">Not sure where to start?</p>
          <h2 className="display mt-8 text-5xl md:text-7xl">Find your Heaven treatment.</h2>
          <p className="mt-8 text-ink-foreground/60">
            Answer one question and discover treatments suited to your goals.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <p className="eyebrow mt-16">What are you looking for?</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {goals.map((g) => (
              <button
                key={g.key}
                type="button"
                onClick={() => setGoal(g.key)}
                className={`border px-6 py-3 text-[0.65rem] tracking-[0.24em] uppercase transition-all duration-500 ${
                  goal === g.key
                    ? "border-gold bg-gold text-gold-foreground"
                    : "border-border-gold text-ink-foreground/70 hover:border-gold hover:text-gold"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </Reveal>

        {recommendation && (
          <div className="mt-16 border border-border-gold p-12">
            <p className="eyebrow">Your Heaven recommendation</p>
            <h3 className="display mt-6 text-5xl uppercase">{recommendation.signature}</h3>
            <p className="mt-3 text-xs tracking-[0.2em] text-ink-foreground/60 uppercase">
              {recommendation.name} · {recommendation.price}
            </p>
            <p className="mx-auto mt-8 max-w-md text-sm text-ink-foreground/60">
              Based on your goals, this treatment may be a good starting point.
            </p>
            <div className="mt-10">
              <Link
                to="/treatments/$slug"
                params={{ slug: recommendation.slug }}
                className="btn-gold"
              >
                Book this treatment →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow">More than a treatment.</p>
          <h2 className="display mt-6 text-5xl md:text-7xl">It's the Heaven Experience.</h2>
        </Reveal>

        <div className="relative mt-20">
          <div className="rule-gold absolute top-[38px] left-0 hidden md:block" />
          <div className="grid gap-14 md:grid-cols-4">
            {stages.map((stage, i) => (
              <Reveal key={stage.n} delay={i * 120}>
                <div className="relative">
                  <span className="relative z-10 inline-flex h-[76px] w-[76px] items-center justify-center rounded-full border border-border-gold bg-background">
                    <span className="display text-2xl text-gold">{stage.n}</span>
                  </span>
                  <h3 className="mt-8 text-[0.7rem] font-semibold tracking-[0.28em] uppercase">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{stage.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvancedSection() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-32 lg:grid-cols-2 lg:px-12">
        <Reveal className="img-zoom">
          <img
            src={advanced}
            alt="Macro close-up of radiant, healthy skin"
            loading="lazy"
            width={1400}
            height={1000}
            className="h-[60vh] w-full object-cover"
          />
        </Reveal>
        <Reveal delay={140}>
          <p className="eyebrow">Heaven Advanced</p>
          <h2 className="display mt-8 text-5xl md:text-7xl">
            Targeted care.
            <br />
            <span className="italic">Thoughtfully delivered.</span>
          </h2>
          <ul className="mt-12 border-t border-border-gold">
            {["Microneedling", "Carbon Laser", "Peels", "SWICH Anti-Aging"].map((item) => (
              <li
                key={item}
                className="border-b border-border-gold py-5 text-lg text-ink-foreground/80"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Link to="/treatments" className="btn-gold">
              Explore Advanced Aesthetics →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Results() {
  const [pos, setPos] = useState(50);

  return (
    <section className="bg-background py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow">Results</p>
          <h2 className="display mt-6 text-5xl md:text-7xl">Real skin. Real journeys.</h2>
        </Reveal>

        <Reveal delay={140} className="mt-16">
          <div className="relative h-[60vh] min-h-[380px] w-full overflow-hidden select-none">
            <img
              src={catSkin}
              alt="Skin before treatment"
              loading="lazy"
              width={900}
              height={1200}
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <img
                src={advanced}
                alt="Skin after treatment"
                loading="lazy"
                width={1400}
                height={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 w-px bg-gold"
              style={{ left: `${pos}%` }}
            />
            <span className="pointer-events-none absolute bottom-6 left-6 text-[0.6rem] tracking-[0.28em] text-ink-foreground uppercase">
              After
            </span>
            <span className="pointer-events-none absolute right-6 bottom-6 text-[0.6rem] tracking-[0.28em] text-ink-foreground uppercase">
              Before
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={pos}
              aria-label="Compare before and after"
              onChange={(e) => setPos(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} delay={i * 120}>
              <figure className="border-t border-border-gold pt-8">
                <blockquote className="display text-2xl leading-snug italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[0.65rem] tracking-[0.24em] text-gold uppercase">
                  — {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rituals() {
  const rituals = [
    { title: "The Glow Ritual", copy: "Facial + Brow + Lash" },
    { title: "The Bridal Ritual", copy: "Pre-event skin + Beauty" },
    { title: "The Renewal Ritual", copy: "Advanced treatment + Facial + Aftercare" },
  ];

  return (
    <section className="bg-ink py-32 text-ink-foreground">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow">Curated combinations</p>
          <h2 className="display mt-6 text-5xl md:text-7xl">The Heaven Rituals</h2>
          <p className="mt-8 max-w-lg text-ink-foreground/60">
            Created for moments that deserve something extra.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {rituals.map((r, i) => (
            <Reveal key={r.title} delay={i * 120}>
              <div className="group border-t border-border-gold pt-8">
                <h3 className="display text-3xl transition-colors group-hover:text-gold">
                  {r.title}
                </h3>
                <p className="mt-3 text-xs tracking-[0.2em] text-ink-foreground/50 uppercase">
                  {r.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={260} className="mt-16">
          <Link to="/experience" className="btn-gold">
            Discover the Rituals →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Bridal() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-32 lg:grid-cols-2 lg:px-12">
        <Reveal>
          <p className="eyebrow">Special occasions</p>
          <h2 className="display mt-8 text-5xl md:text-7xl">
            Your moment.
            <br />
            <span className="italic">Your glow.</span>
          </h2>
          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {["Brides", "Birthdays", "Photoshoots", "Weddings", "Events"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-12">
            <Link to="/contact" className="btn-ink">
              Plan your beauty journey →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={140} className="img-zoom">
          <img
            src={catBeauty}
            alt="Close-up of sculpted brows and lash extensions"
            loading="lazy"
            width={900}
            height={1200}
            className="h-[62vh] w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}

function AboutStrip() {
  return (
    <section className="bg-background pb-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-12">
        <Reveal className="img-zoom">
          <img
            src={interior}
            alt="Interior of the Heaven Aesthetics studio"
            loading="lazy"
            width={1400}
            height={1000}
            className="h-[58vh] w-full object-cover"
          />
        </Reveal>
        <Reveal delay={140}>
          <p className="eyebrow">About Heaven</p>
          <h2 className="display mt-8 text-5xl md:text-6xl">Beauty is personal.</h2>
          <p className="mt-8 leading-relaxed text-muted-foreground">
            At Heaven Aesthetics, we believe exceptional beauty care begins with understanding the
            individual.
          </p>
          <ul className="mt-12 space-y-4 text-[0.7rem] font-semibold tracking-[0.28em] uppercase">
            <li className="border-b border-border-gold pb-4">Bespoke Care</li>
            <li className="border-b border-border-gold pb-4">Professional Excellence</li>
            <li className="border-b border-border-gold pb-4">Tranquil Luxury</li>
          </ul>
          <div className="mt-12">
            <Link to="/about" className="btn-ink">
              Our Story →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function JournalStrip() {
  const entries = [
    { tag: "Skin", copy: "How to maintain your skin between treatments." },
    { tag: "Beauty", copy: "Lash, brow and beauty guides." },
    { tag: "Expertise", copy: "Understanding aesthetic treatments." },
    { tag: "Rituals", copy: "Self-care and wellness." },
  ];

  return (
    <section className="bg-background pb-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <div className="rule-gold" />
          <h2 className="display mt-12 text-5xl md:text-7xl">The Heaven Journal</h2>
        </Reveal>
        <div className="mt-14 grid gap-px bg-border-gold sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((e, i) => (
            <Reveal key={e.tag} delay={i * 100}>
              <Link to="/journal" className="group block h-full bg-background p-10">
                <p className="eyebrow">{e.tag}</p>
                <p className="display mt-6 text-2xl leading-snug transition-colors group-hover:text-gold">
                  {e.copy}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstagramStrip() {
  const grid = [catSkin, advanced, catBeauty, catBody, interior, catAdvanced];

  return (
    <section className="bg-background pb-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">From Heaven</p>
              <h2 className="display mt-4 text-4xl">@heavenaesthetics</h2>
            </div>
            <a
              href="https://instagram.com/heavenaesthetics"
              target="_blank"
              rel="noreferrer"
              className="link-gold text-[0.68rem] tracking-[0.24em] uppercase hover:text-gold"
            >
              Follow the journey →
            </a>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-px bg-border-gold sm:grid-cols-3 lg:grid-cols-6">
          {grid.map((src, i) => (
            <Reveal key={i} delay={i * 70} className="img-zoom">
              <img
                src={src}
                alt="Heaven Aesthetics on Instagram"
                loading="lazy"
                width={900}
                height={900}
                className="aspect-square w-full object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-40 text-center text-ink-foreground">
      <span
        aria-hidden
        className="display pointer-events-none absolute inset-0 flex items-center justify-center text-[30vw] leading-none opacity-[0.05] select-none"
      >
        H
      </span>
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="eyebrow">Your skin journey starts here.</p>
        </Reveal>
        <Reveal delay={140}>
          <h2 className="display mt-10 text-6xl md:text-8xl">Welcome to Heaven.</h2>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-14">
            <Link to="/contact" className="btn-gold">
              Book an Appointment →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
