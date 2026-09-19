import { useMemo, useState, type ReactNode } from "react";
import { categories, treatments } from "@/lib/heaven";
import { cn } from "@/lib/utils";

export function ServiceStep({
  selectedSlug,
  onSelect,
}: {
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return treatments.filter((t) => {
      const matchesCategory = activeCategory === "all" || t.category === activeCategory;
      const matchesQuery = q.length === 0 || t.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search treatments…"
        className="w-full border-b border-border-gold bg-transparent pb-3 text-sm outline-none placeholder:text-muted-foreground focus:border-gold"
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <CategoryPill active={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
          All
        </CategoryPill>
        {categories.map((c) => (
          <CategoryPill
            key={c.key}
            active={activeCategory === c.key}
            onClick={() => setActiveCategory(c.key)}
          >
            {c.label}
          </CategoryPill>
        ))}
      </div>

      <div className="mt-6 max-h-[440px] space-y-3 overflow-y-auto pr-1">
        {filtered.map((t) => (
          <button
            type="button"
            key={t.slug}
            onClick={() => onSelect(t.slug)}
            className={cn(
              "flex w-full items-start justify-between gap-4 border px-5 py-4 text-left transition-colors",
              selectedSlug === t.slug
                ? "border-gold bg-accent"
                : "border-border hover:border-gold/50",
            )}
          >
            <span>
              <span className="block font-medium">{t.name}</span>
              <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">
                {t.summary}
              </span>
            </span>
            <span className="shrink-0 text-sm font-semibold text-gold">{t.price}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No treatments match your search.
          </p>
        )}
      </div>
    </div>
  );
}

function CategoryPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] transition-colors",
        active
          ? "border-gold bg-gold text-gold-foreground"
          : "border-border text-muted-foreground hover:border-gold/50",
      )}
    >
      {children}
    </button>
  );
}
