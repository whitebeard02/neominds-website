import { useCountUp } from "@/hooks/use-count-up";

const stats = [
  { value: 5000, suffix: "+", label: "Community Members" },
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 850, suffix: "+", label: "Students Trained" },
  { value: 40, suffix: "+", label: "Automations Built" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function Stat({ value, suffix, label }: (typeof stats)[number]) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div ref={ref} className="reveal flex flex-col items-center justify-center px-4 py-8 text-center">
      <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        <span className="text-gradient-primary">{v.toLocaleString()}</span>
        <span className="text-foreground">{suffix}</span>
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="section-padding">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 shadow-elegant backdrop-blur">
          <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--gradient-radial)" }} />
          <div className="grid divide-y divide-border md:grid-cols-5 md:divide-x md:divide-y-0">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
