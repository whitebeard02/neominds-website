import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/sections/Services";
import { CtaCard } from "@/components/sections/CtaCard";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Neominds Tech Hub" },
      { name: "description", content: "Web, product, automation, AI, mobile, and training. End-to-end engineering by senior practitioners." },
      { property: "og:title", content: "Services — Neominds Tech Hub" },
    ],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>Engineering services, <span className="text-gradient-primary">built end to end.</span></>}
        description="Six focused capabilities. One senior team. Engagements scoped around outcomes, not hours."
      />
      <Services />
      <CtaCard />
    </>
  );
}
