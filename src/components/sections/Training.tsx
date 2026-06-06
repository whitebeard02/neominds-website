import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "../SectionHeading";

const pillars = [
  "Real-world project experience",
  "Practical implementation, not theory",
  "Industry-relevant, current skills",
  "AI-focused, future-ready learning",
  "Hands-on mentoring from senior engineers",
  "Career-oriented curriculum and reviews",
];

export function Training() {
  return (
    <section id="training" className="section-padding bg-[var(--gradient-surface)]">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Training programs"
            title={<>Learn the way real <span className="text-gradient-primary">engineers learn.</span></>}
            description="Cohort-based programs designed and led by the same team that ships our client work."
          />
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <Link
              to="/training"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              View programs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-5 py-3 text-sm font-medium hover:border-primary/60"
            >
              Talk to a mentor
            </Link>
          </div>
        </div>

        <ul className="reveal grid gap-3 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <li
              key={p}
              className="hover-lift group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-inset ring-primary/25 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Check className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-foreground/90">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
