import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "../components/site/Reveal";
import { useCart } from "../lib/cart";
import { formatTzs } from "../lib/shop";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Heaven Aesthetics" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, itemCount, setQuantity, removeItem, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 pt-32">
        <Reveal className="max-w-md border border-border-gold p-12 text-center">
          <p className="eyebrow">Order received</p>
          <h1 className="display mt-6 text-4xl">Thank you.</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Our team will reach out shortly to confirm your order and arrange delivery or
            in-studio pickup.
          </p>
          <div className="mt-10">
            <Link to="/shop" className="btn-ink">
              Continue Shopping →
            </Link>
          </div>
        </Reveal>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pt-32 text-center">
        <Reveal>
          <p className="eyebrow">Your cart</p>
          <h1 className="display mt-6 text-5xl">It's empty, for now.</h1>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Explore the Heaven home care edit and bring your treatment routine home with you.
          </p>
          <div className="mt-10">
            <Link to="/shop" className="btn-gold">
              Shop Home Care →
            </Link>
          </div>
        </Reveal>
      </main>
    );
  }

  return (
    <main className="bg-background pt-32">
      <div className="mx-auto max-w-[1400px] px-6 pb-32 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Your cart</p>
              <h1 className="display mt-4 text-5xl md:text-6xl">
                Shopping Cart{" "}
                <span className="text-2xl text-muted-foreground">
                  ({itemCount} item{itemCount === 1 ? "" : "s"})
                </span>
              </h1>
            </div>
            <button
              type="button"
              onClick={clear}
              className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase hover:text-foreground"
            >
              Clear cart
            </button>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <Reveal delay={100}>
            <div className="border-t border-border-gold">
              {lines.map(({ product, quantity, lineTotal }) => (
                <div
                  key={product.slug}
                  className="flex flex-col gap-6 border-b border-border-gold py-8 sm:flex-row sm:items-center"
                >
                  <Link
                    to="/shop/$slug"
                    params={{ slug: product.slug }}
                    className="flex h-24 w-24 shrink-0 items-center justify-center border border-border-gold bg-ink"
                  >
                    <span className="display text-4xl text-gold/60">
                      {product.name.charAt(0)}
                    </span>
                  </Link>

                  <div className="flex-1">
                    <Link
                      to="/shop/$slug"
                      params={{ slug: product.slug }}
                      className="display text-2xl transition-colors hover:text-gold"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-[0.62rem] tracking-widest text-muted-foreground uppercase">
                      {product.brand} · {product.size}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(product.slug)}
                      className="mt-3 text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase link-gold hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center border border-border-gold">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() => setQuantity(product.slug, quantity - 1)}
                      className="px-4 py-2 text-foreground/70 transition-colors hover:text-gold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => setQuantity(product.slug, quantity + 1)}
                      className="px-4 py-2 text-foreground/70 transition-colors hover:text-gold"
                    >
                      +
                    </button>
                  </div>

                  <span className="w-28 text-right text-sm font-semibold tracking-wider text-gold">
                    {formatTzs(lineTotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link to="/shop" className="link-gold text-[0.68rem] tracking-[0.24em] uppercase hover:text-gold">
                ← Continue Shopping
              </Link>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="border border-border-gold p-10">
              <p className="eyebrow">Order Summary</p>
              <div className="mt-8 space-y-4 border-t border-border-gold pt-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})
                  </span>
                  <span>{formatTzs(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-muted-foreground">Arranged at checkout</span>
                </div>
              </div>
              <div className="mt-8 flex items-baseline justify-between border-t border-border-gold pt-8">
                <span className="text-[0.7rem] font-semibold tracking-[0.24em] uppercase">
                  Estimated Total
                </span>
                <span className="display text-3xl text-gold">{formatTzs(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPlaced(true);
                  clear();
                }}
                className="btn-gold mt-10 w-full justify-center"
              >
                Continue to Checkout →
              </button>
              <p className="mt-6 text-center text-[0.65rem] leading-relaxed text-muted-foreground">
                Our team will confirm your order and arrange delivery or in-studio pickup.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
