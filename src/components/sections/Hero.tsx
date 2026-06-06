import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      </div>

      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>AI Engineering • Automation • Training</span>
          </div>

          <h1 className="animate-fade-up mt-6 max-w-5xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Building <span className="text-gradient-primary">intelligent products</span>
            <br className="hidden sm:block" /> for the next generation of teams.
          </h1>

          <p className="animate-fade-up mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "120ms" }}>
            {site.name} engineers modern software, AI systems, and automation — and trains the engineers who build them.
            <span className="block mt-2 text-foreground/90 italic">{site.tagline}</span>
          </p>

          <div className="animate-fade-up mt-9 flex flex-col items-center gap-3 sm:flex-row" style={{ animationDelay: "220ms" }}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/training"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/60"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Explore training
            </Link>
          </div>

          {/* Floating glass stat strip */}
          <div className="animate-scale-in mt-16 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl glass shadow-elegant sm:grid-cols-4" style={{ animationDelay: "320ms" }}>
            {[
              { v: "5000+", l: "Community" },
              { v: "120+", l: "Projects" },
              { v: "40+", l: "Automations" },
              { v: "98%", l: "Satisfaction" },
            ].map((s) => (
              <div key={s.l} className="bg-background/40 px-5 py-5 text-center">
                <div className="font-display text-2xl font-semibold text-foreground sm:text-3xl">{s.v}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
