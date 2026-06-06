import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PageHeader } from "@/components/PageHeader";
import { Industries } from "@/components/sections/Industries";
import { CtaCard } from "@/components/sections/CtaCard";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Neominds Tech Hub" },
      { name: "description", content: "We partner across healthcare, education, e-commerce, manufacturing, logistics, finance, real estate, startups, enterprise, and AI." },
      { property: "og:title", content: "Industries — Neominds Tech Hub" },
    ],
  }),
  component: Page,
});

function Page() {
  useReveal();
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={<>Domain-aware engineering for <span className="text-gradient-primary">every sector.</span></>}
        description="Each industry has its own constraints. We've shipped under most of them."
      />
      <Industries />
      <CtaCard />
    </>
  );
}
