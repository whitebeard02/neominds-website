import { useEffect, useState } from "react";

import { useReducedMotion } from "./use-reduced-motion";

export type InitialLoaderPhase = "loading" | "exiting" | "done";

export function useInitialLoader() {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<InitialLoaderPhase>("loading");

  useEffect(() => {
    const minDisplay = reducedMotion ? 150 : 1400;
    const exitDuration = reducedMotion ? 80 : 450;
    const started = performance.now();

    const complete = () => {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, minDisplay - elapsed);

      window.setTimeout(() => {
        setPhase("exiting");
        window.setTimeout(() => setPhase("done"), exitDuration);
      }, wait);
    };

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
      return () => window.removeEventListener("load", complete);
    }
  }, [reducedMotion]);

  return phase;
}
