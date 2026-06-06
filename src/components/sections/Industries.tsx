import {
  HeartPulse, GraduationCap, ShoppingBag, Factory, Truck, Landmark,
  Building2, Rocket, Briefcase, Cpu,
} from "lucide-react";
import { SectionHeading } from "../SectionHeading";

const industries = [
  { icon: HeartPulse, name: "Healthcare" },
  { icon: GraduationCap, name: "Education" },
  { icon: ShoppingBag, name: "E-Commerce" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Truck, name: "Logistics" },
  { icon: Landmark, name: "Finance" },
  { icon: Building2, name: "Real Estate" },
  { icon: Rocket, name: "Startups" },
  { icon: Briefcase, name: "Enterprise" },
  { icon: Cpu, name: "AI Companies" },
];

export function Industries() {
  return (
    <section id="industries" className="section-padding bg-[var(--gradient-surface)]">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries we serve"
          title={<>Engineered for <span className="text-gradient-primary">every sector</span> we touch.</>}
          description="We bring domain awareness to every engagement — from regulated industries to high-growth startups."
        />

        <div className="reveal mt-14 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.04] text-muted-foreground ring-1 ring-inset ring-white/10 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{ind.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
