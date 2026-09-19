import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "../components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — Heaven Aesthetics" },
      {
        name: "description",
        content:
          "Book your Heaven Aesthetics appointment in Dodoma. Share your goals and we'll plan your skin journey.",
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
              <span className="eyebrow block">Studio Location</span>
              <span className="mt-2 block">
                AVE MARIA SAUNA,<br />
                Near Kamwana Express HQ, Ilazo,<br />
                Dodoma, Tanzania
              </span>
            </p>
            <p>
              <span className="eyebrow block">Phone & WhatsApp</span>
              <a href="tel:+255797868749" className="mt-2 block link-gold hover:text-gold">
                +255 797 868 749
              </a>
            </p>
            <p>
              <span className="eyebrow block">Hours</span>
              <span className="mt-2 block">Mon – Sat · 09:00 – 19:00</span>
            </p>
            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/arXcTKGJNQp91dst7"
                target="_blank"
                rel="noreferrer"
                className="text-[0.65rem] tracking-[0.2em] text-gold uppercase hover:underline"
              >

              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="border border-border-gold p-12">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="display mt-6 text-4xl">Book your visit.</h2>
            <p className="mt-4 text-sm text-ink-foreground/60">
              Choose your treatment, pick a time, and tell us about your skin — all in one
              place.
            </p>
            <Link to="/book" className="btn-gold mt-8 inline-flex">
              Book an Appointment →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="w-full mt-24 mb-0 pb-0 p-0 m-0">
        <iframe
          title="Heaven Aesthetics Beauty Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3963.2625121307615!2d35.7969896!3d-6.157707!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x184de5d0759046ed%3A0x269e60adb30ceb00!2sHeaven%20Aesthetics%20Beauty!5e0!3m2!1sen!2stz!4v1723677000000!5m2!1sen!2stz"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="opacity-80 transition-opacity duration-300 hover:opacity-100 w-full block border-0"
        />
      </section>
    </main>
  );
}
