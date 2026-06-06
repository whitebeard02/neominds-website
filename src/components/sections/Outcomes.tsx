import { TrendingUp, Zap, Sparkles, Trophy, Globe2 } from "lucide-react";
import { SectionHeading } from "../SectionHeading";

const cards = [
  { icon: TrendingUp, title: "Business growth", desc: "Products that compound revenue, retention, and reach.", stat: "3.2x", statLabel: "avg. growth lift" },
  { icon: Zap, title: "Automation efficiency", desc: "Operational hours saved every single week.", stat: "70%", statLabel: "manual work removed" },
  { icon: Sparkles, title: "AI implementation", desc: "Models in production driving real decisions.", stat: "40+", statLabel: "AI features shipped" },
  { icon: Trophy, title: "Student success", desc: "Career outcomes our learners actually achieve.", stat: "92%", statLabel: "placement signal" },
  { icon: Globe2, title: "Industry impact", desc: "Trusted across 10 industries and counting.", stat: "10", statLabel: "sectors served" },
];

export function Outcomes() {
  return (
    <section className="section-padding">
      <div className="container-x">
        <SectionHeading
          eyebrow="Outcomes"
          title={<>The work shows up <span className="text-gradient-primary">in the numbers.</span></>}
          description="What changes when teams ship with Neominds — and what graduates take into their careers."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="reveal hover-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-semibold text-gradient-primary">{c.stat}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{c.statLabel}</div>
                  </div>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
