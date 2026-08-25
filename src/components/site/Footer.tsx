import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="display block text-4xl tracking-[0.16em]">HEAVEN</span>
            <span className="mt-2 block text-[0.6rem] font-medium tracking-[0.5em] opacity-70">
              AESTHETICS
            </span>
            <p className="display mt-8 text-xl text-gold italic">
              Healthy Skin Is Always In.
            </p>
          </div>

          <FooterColumn
            title="Explore"
            links={[
              { label: "Treatments", to: "/treatments" },
              { label: "About", to: "/about" },
              { label: "Experience", to: "/experience" },
              { label: "Journal", to: "/journal" },
              { label: "Contact", to: "/contact" },
            ]}
          />
          <FooterColumn
            title="Treatments"
            links={[
              { label: "Facials", to: "/treatments" },
              { label: "Advanced Aesthetics", to: "/treatments" },
              { label: "Lashes & Brows", to: "/treatments" },
              { label: "Body Care", to: "/treatments" },
            ]}
          />

          <div>
            <h3 className="eyebrow">Connect</h3>
            <ul className="mt-6 space-y-4 text-sm text-ink-foreground/70">
              <li>
                <a
                  href="https://instagram.com/heavenaesthetics"
                  target="_blank"
                  rel="noreferrer"
                  className="link-gold transition-colors hover:text-gold"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://wa.me/255797868749" className="link-gold transition-colors hover:text-gold">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="tel:+255797868749" className="link-gold transition-colors hover:text-gold">
                  +255 797 868 749
                </a>
              </li>
              <li>Dodoma, Tanzania</li>
            </ul>
          </div>
        </div>

        <div className="rule-gold mt-20" />
        <div className="mt-8 flex flex-col gap-3 text-[0.65rem] tracking-[0.2em] text-ink-foreground/40 uppercase sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Heaven Aesthetics</span>
          <span>Welcome to Heaven.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-6 space-y-4 text-sm text-ink-foreground/70">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="link-gold transition-colors hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
