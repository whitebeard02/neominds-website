import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CtaCard() {
  return (
    <section className="section-padding">
      <div className="container-x">
        <div className="reveal relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-10 shadow-elegant sm:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Let's build
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                Ready to transform your <span className="text-gradient-primary">business with AI, automation, and modern technology?</span>
              </h2>
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                Whether you're looking to build a product, automate workflows, implement AI solutions, or upskill your team, Neominds Tech Hub is ready to help.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                Contact us
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/[0.03] px-6 py-3.5 text-sm font-medium hover:border-primary/60"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
