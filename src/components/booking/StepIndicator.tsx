const STEPS = ["Service", "Date & Time", "Consultation", "Payment", "Confirm"] as const;

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-12">
      <p className="eyebrow">
        Step {current} of {STEPS.length}
      </p>
      <h2 className="display mt-3 text-3xl md:text-4xl">{STEPS[current - 1]}</h2>
      <div className="mt-6 flex gap-2">
        {STEPS.map((label, index) => (
          <div
            key={label}
            className={`h-[2px] flex-1 transition-colors ${
              index < current ? "bg-gold" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
