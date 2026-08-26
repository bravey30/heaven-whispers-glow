import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Reveal } from "../components/site/Reveal";
import { useCart } from "../lib/cart";
import { formatTzs, products } from "../lib/shop";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable — Heaven Aesthetics" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} · ${product.brand} — Heaven Aesthetics`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addItem(product.slug, quantity);
    toast(`${product.name} added to cart`);
  };

  return (
    <main className="bg-background">
      <section className="relative bg-ink pt-32 text-ink-foreground">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-12">
          <Reveal>
            <p className="eyebrow">{product.brand}</p>
            <h1 className="display mt-6 text-6xl md:text-8xl">{product.name}</h1>
            <p className="mt-6 text-[0.65rem] tracking-[0.28em] text-ink-foreground/50 uppercase">
              {product.size}
            </p>
            <p className="mt-8 text-lg text-gold">{formatTzs(product.price)}</p>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <div className="flex items-center border border-border-gold">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-ink-foreground/70 transition-colors hover:text-gold"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 text-ink-foreground/70 transition-colors hover:text-gold"
                >
                  +
                </button>
              </div>
              <button type="button" onClick={handleAdd} className="btn-gold">
                Add to Cart →
              </button>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="flex aspect-[4/5] w-full items-center justify-center border border-border-gold bg-ink">
              <span className="display text-[8rem] leading-none text-gold/60 md:text-[10rem]">
                {product.name.charAt(0)}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-28 lg:px-12">
        <Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="eyebrow mt-16">Benefits</h2>
          <ul className="mt-8 border-t border-border-gold">
            {product.benefits.map((item) => (
              <li key={item} className="border-b border-border-gold py-5 text-lg">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200} className="mt-16">
          <Link to="/shop" className="btn-ink">
            All Products →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
