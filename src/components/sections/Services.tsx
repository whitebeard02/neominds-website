import { Code2, Boxes, Workflow, BrainCircuit, Smartphone, GraduationCap, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../SectionHeading";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "High-performance websites and web apps engineered for speed, scale, and conversion.",
    points: ["Next-gen React stacks", "Headless CMS & SSR", "SEO-ready architecture"],
  },
  {
    icon: Boxes,
    title: "Product Development",
    desc: "End-to-end product engineering from discovery to launch, built for real users.",
    points: ["MVP to production", "Design & engineering", "Scalable SaaS systems"],
  },
  {
    icon: Workflow,
    title: "Automation Solutions",
    desc: "Reclaim hours every week with workflows, integrations, and intelligent agents.",
    points: ["Workflow automation", "API integrations", "RPA & data pipelines"],
  },
  {
    icon: BrainCircuit,
    title: "Custom AI Projects",
    desc: "Production-grade AI tailored to your data, your domain, and your business outcomes.",
    points: ["LLM & RAG systems", "Computer vision", "Predictive ML models"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    desc: "Native-feel iOS and Android apps shipped from a single, modern codebase.",
    points: ["React Native & Flutter", "Offline-first UX", "App store delivery"],
  },
  {
    icon: GraduationCap,
    title: "Custom Training Programs",
    desc: "Career-grade upskilling for individuals, teams, and enterprises in AI & engineering.",
    points: ["Live mentor cohorts", "Real-world projects", "Job-ready outcomes"],
  },
];

export function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title={<>Six capabilities. <span className="text-gradient-primary">One partner.</span></>}
          description="From product engineering to AI and training, every engagement is led by senior practitioners."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="reveal hover-lift group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "var(--gradient-radial)" }} />
                <div className="absolute right-5 top-5 text-muted-foreground/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary">
                  <ArrowUpRight className="h-5 w-5" />
                </div>

                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-foreground/85">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
