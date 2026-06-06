import { Award, BookOpenCheck, Cog, BrainCircuit, Briefcase, HeartHandshake } from "lucide-react";
import { SectionHeading } from "../SectionHeading";

const points = [
  { icon: Briefcase, title: "Real-world projects", desc: "We ship products in production — and we teach what we ship." },
  { icon: Award, title: "Industry experience", desc: "Senior engineers and operators with deep, cross-sector exposure." },
  { icon: BookOpenCheck, title: "Practical learning", desc: "Curricula built around outcomes, not slides." },
  { icon: Cog, title: "Automation expertise", desc: "We remove manual work with measurable ROI." },
  { icon: BrainCircuit, title: "AI expertise", desc: "From LLM agents to vision models — applied, not academic." },
  { icon: HeartHandshake, title: "Client-focused", desc: "Your goals lead the roadmap. We make them happen." },
];

export function WhyChoose() {
  return (
    <section className="section-padding">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Neominds"
          title={<>A partner you can <span className="text-gradient-primary">build with for years</span>.</>}
          description="We combine the discipline of an engineering studio with the energy of a learning community."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="reveal group relative bg-background p-8 transition-colors hover:bg-card"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
