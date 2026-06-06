import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      </div>
      <div className="container-x text-center">
        <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
        <h1 className="animate-fade-up mt-5 mx-auto max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="animate-fade-up mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "120ms" }}>
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
