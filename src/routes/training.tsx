import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PageHeader } from "@/components/PageHeader";
import { Training } from "@/components/sections/Training";
import { Stats } from "@/components/sections/Stats";
import { CtaCard } from "@/components/sections/CtaCard";
import { SectionHeading } from "@/components/SectionHeading";
import { BrainCircuit, Code2, Workflow, Smartphone, Boxes, GraduationCap } from "lucide-react";

const programs = [
  { icon: BrainCircuit, title: "Applied AI Engineering", duration: "12 weeks", level: "Intermediate", desc: "LLMs, RAG, evaluation, and production deployment." },
  { icon: Code2, title: "Full-Stack Web Engineering", duration: "16 weeks", level: "Beginner → Advanced", desc: "Modern React, APIs, databases, and deployment." },
  { icon: Workflow, title: "Automation & Agents", duration: "8 weeks", level: "Intermediate", desc: "Workflow automation, integrations, and AI agents." },
  { icon: Smartphone, title: "Mobile App Development", duration: "10 weeks", level: "Beginner → Intermediate", desc: "Cross-platform apps with React Native & Flutter." },
  { icon: Boxes, title: "Product Engineering", duration: "12 weeks", level: "Advanced", desc: "From MVP to production-grade SaaS systems." },
  { icon: GraduationCap, title: "Custom Corporate Training", duration: "Tailored", level: "All levels", desc: "Programs designed for your team's exact stack and goals." },
];

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training Programs — Neominds Tech Hub" },
      { name: "description", content: "Cohort-based AI & engineering programs led by senior practitioners. Real projects. Real outcomes." },
      { property: "og:title", content: "Training Programs — Neominds Tech Hub" },
    ],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <>
      <PageHeader
        eyebrow="Training Programs"
        title={<>Career-grade learning, <span className="text-gradient-primary">designed by engineers.</span></>}
        description="Hands-on cohorts taught by the team that ships our client work — not a content factory."
      />

      <section className="section-padding">
        <div className="container-x">
          <SectionHeading
            eyebrow="Programs"
            title={<>Find the program <span className="text-gradient-primary">that moves you forward.</span></>}
            description="Live mentorship, real projects, and a curriculum that reflects what teams actually build."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className="reveal hover-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-border bg-white/[0.04] px-3 py-1 text-[11px] text-muted-foreground">{p.duration}</span>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] text-primary">{p.level}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Training />
      <Stats />
    </>
  );
}
