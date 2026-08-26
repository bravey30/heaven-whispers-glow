import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "../components/site/Reveal";
import { useCart } from "../lib/cart";
import { formatTzs, productCategories, products } from "../lib/shop";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Heaven Aesthetics" },
      {
        name: "description",
        content:
          "Take the Heaven ritual home. Cleansers, masks, serums and moisturizers from the same product lines used in our treatments.",
      },
      { property: "og:title", content: "Shop — Heaven Aesthetics" },
      {
        property: "og:description",
        content: "Home care, curated. The same products used in your Heaven treatments.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [active, setActive] = useState<string>("all");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const { addItem } = useCart();

  const list =
    active === "all" ? products : products.filter((p) => p.category === active);

  const handleAdd = (slug: string, name: string) => {
    addItem(slug);
    toast(`${name} added to cart`);
  };

  const toggleSaved = (slug: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <main className="bg-background pt-32">
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-12">
        <Reveal>
          <p className="eyebrow">Take Heaven home</p>
          <h1 className="display mt-8 text-6xl md:text-8xl">Shop</h1>
          <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
            The same cleansers, masks and serums used in your treatments — curated for
            your routine between visits.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-12 lg:px-12">
        <div className="flex flex-wrap gap-x-10 gap-y-4 border-y border-border-gold py-6">
          {[{ key: "all", label: "All" }, ...productCategories].map((cat) => (
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
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((product, i) => {
            const isSaved = saved.has(product.slug);
            return (
              <Reveal key={product.slug} delay={(i % 8) * 70}>
                <div className="group flex h-full flex-col">
                  <div className="relative">
                    <Link
                      to="/shop/$slug"
                      params={{ slug: product.slug }}
                      className="img-zoom flex aspect-square w-full items-center justify-center border border-border-gold bg-ink"
                    >
                      <span className="display text-6xl text-gold/60">
                        {product.name.charAt(0)}
                      </span>
                    </Link>
                    <button
                      type="button"
                      aria-label={isSaved ? `Remove ${product.name} from saved` : `Save ${product.name}`}
                      onClick={() => toggleSaved(product.slug)}
                      className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center bg-background/90 text-ink transition-colors hover:text-gold"
                    >
                      <Heart
                        className="h-4 w-4"
                        strokeWidth={1.5}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <p className="eyebrow">{product.brand}</p>
                    <div className="mt-3 flex items-baseline justify-between gap-3">
                      <Link to="/shop/$slug" params={{ slug: product.slug }}>
                        <h3 className="display text-2xl transition-colors group-hover:text-gold">
                          {product.name}
                        </h3>
                      </Link>
                      <span className="shrink-0 text-sm font-semibold tracking-wider text-gold">
                        {formatTzs(product.price)}
                      </span>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAdd(product.slug, product.name)}
                      className="mt-6 w-full border border-ink px-5 py-3 text-[0.62rem] font-semibold tracking-[0.2em] text-ink uppercase transition-all duration-500 hover:bg-ink hover:text-ink-foreground"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </main>
  );
}
