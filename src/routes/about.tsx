import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PageHeader } from "@/components/PageHeader";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Stats } from "@/components/sections/Stats";
import { CtaCard } from "@/components/sections/CtaCard";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Neominds Tech Hub" },
      { name: "description", content: "An IT solutions company and AI training institute based in Hyderabad. Engineers, mentors, and a 5000+ member community." },
      { property: "og:title", content: "About — Neominds Tech Hub" },
    ],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={<>An engineering studio and <span className="text-gradient-primary">a learning community.</span></>}
        description={`${site.tagline} — that's not a tagline, it's how we operate.`}
      />

      <section className="section-padding">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="reveal">
            <SectionHeading
              eyebrow="Who we are"
              title={<>Built by people who <span className="text-gradient-primary">ship for a living.</span></>}
              description="Neominds Tech Hub is an IT solutions & services company and an AI training institute headquartered in Hyderabad. We build real software for real customers — and we train the next generation of engineers using the same craft."
            />
            <p className="mt-6 text-muted-foreground">
              Our work spans modern web and mobile products, custom AI systems, and operational automation for teams across ten industries. We're proud of the community we've grown — over {site.community} learners, builders, and mentors growing together.
            </p>
          </div>
          <div className="reveal grid gap-4 sm:grid-cols-2">
            {[
              { k: "Founded in", v: "Hyderabad" },
              { k: "Team", v: "Senior engineers" },
              { k: "Community", v: site.community },
              { k: "Focus", v: "AI • Software • Training" },
            ].map((c) => (
              <div key={c.k} className="hover-lift rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{c.k}</div>
                <div className="mt-2 font-display text-xl font-semibold">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChoose />
      <Stats />
      <CtaCard />
    </>
  );
}
