import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Training } from "@/components/sections/Training";
import { Stats } from "@/components/sections/Stats";
import { Outcomes } from "@/components/sections/Outcomes";
import { CtaCard } from "@/components/sections/CtaCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neominds Tech Hub — IT Solutions, AI Engineering & Training" },
      { name: "description", content: "We build modern software, AI systems, and automation — and train the engineers who build them. Based in Hyderabad. Community of 5000+." },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <>
      <Hero />
      <Services />
      <Industries />
      <WhyChoose />
      <Training />
      <Stats />
      <Outcomes />
      <CtaCard />
    </>
  );
}
