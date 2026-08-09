export function Wordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  const color = tone === "light" ? "text-ink-foreground" : "text-ink";
  return (
    <span className={`block leading-none ${color}`}>
      <span className="display block text-2xl tracking-[0.18em]">HEAVEN</span>
      <span className="mt-1 block text-[0.5rem] font-medium tracking-[0.52em] opacity-70">
        AESTHETICS
      </span>
    </span>
  );
}
