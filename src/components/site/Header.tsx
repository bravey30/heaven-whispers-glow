import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../../lib/cart";
import { Wordmark } from "./Wordmark";

const nav = [
  { to: "/treatments", label: "Treatments" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

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
          <Wordmark tone={scrolled ? "light" : "gold"} />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`link-gold text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors ${
                scrolled
                  ? "text-ink-foreground/80 hover:text-gold"
                  : "text-gold hover:text-gold-soft"
              }`}
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <CartLink scrolled={scrolled} onNavigate={() => setOpen(false)} />

          <div className="hidden lg:block">
            <Link to="/book" className="btn-gold">
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
          <Link to="/book" onClick={() => setOpen(false)} className="btn-gold mt-4 self-start">
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CartLink({
  scrolled,
  onNavigate,
}: {
  scrolled: boolean;
  onNavigate: () => void;
}) {
  const { itemCount } = useCart();

  return (
    <Link
      to="/cart"
      onClick={onNavigate}
      aria-label={`View cart${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? "" : "s"}` : ""}`}
      className={`relative flex h-9 w-9 items-center justify-center transition-colors ${
        scrolled ? "text-ink-foreground/80 hover:text-gold" : "text-gold hover:text-gold-soft"
      }`}
    >
      <ShoppingBag className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center bg-gold px-1 text-[0.6rem] font-semibold text-gold-foreground">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
