import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./shop";

type CartItem = { slug: string; quantity: number };

export type CartLine = { product: Product; quantity: number; lineTotal: number };

type CartContextValue = {
  itemCount: number;
  lines: CartLine[];
  subtotal: number;
  addItem: (slug: string, quantity?: number) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "heaven-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed or inaccessible storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage write failures (e.g. private browsing)
    }
  }, [items, hydrated]);

  const addItem = (slug: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { slug, quantity }];
    });
  };

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  };

  const setQuantity = (slug: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, quantity } : i)),
    );
  };

  const clear = () => setItems([]);

  const lines = useMemo(
    () =>
      items.reduce<CartLine[]>((acc, item) => {
        const product = products.find((p) => p.slug === item.slug);
        if (product) acc.push({ product, quantity: item.quantity, lineTotal: product.price * item.quantity });
        return acc;
      }, []),
    [items],
  );

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ itemCount, lines, subtotal, addItem, removeItem, setQuantity, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
