import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";

const nav = [
  { to: "/treatments", label: "Treatments" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-ink/95 backdrop-blur-md border-b border-border-gold"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-gold text-[0.7rem] font-medium tracking-[0.22em] text-ink-foreground/80 uppercase transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-gold">
            Book Appointment
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[6px] p-2 lg:hidden"
        >
          <span
            className={`block h-px w-7 bg-gold transition-transform duration-500 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`block h-px w-7 bg-gold transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-px w-7 bg-gold transition-transform duration-500 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-border-gold bg-ink transition-all duration-700 lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="flex flex-col gap-6 px-6 py-10">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="display text-3xl text-ink-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-4 self-start">
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
