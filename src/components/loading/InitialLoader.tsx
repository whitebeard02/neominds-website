import { useEffect, useState } from "react";

import { useInitialLoader, type InitialLoaderPhase } from "@/hooks/use-initial-loader";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { NetworkPulse } from "./NetworkPulse";

const LOADING_MESSAGES = [
  "Initializing Innovation...",
  "Building Intelligent Solutions...",
  "Preparing Your Experience...",
  "Connecting Technology & Learning...",
  "Powering AI-Driven Solutions...",
];

export function InitialLoader() {
  const phase = useInitialLoader();
  const reducedMotion = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (phase === "done" || reducedMotion) return;

    const id = window.setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2600);

    return () => window.clearInterval(id);
  }, [phase, reducedMotion]);

  if (phase === "done") return null;

  return (
    <div
      className={cn(
        "loader-splash fixed inset-0 z-[100] flex flex-col items-center justify-center px-6",
        phase === "exiting" && "loader-splash-exit",
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading Neominds Tech Hub"
    >
      <div className="loader-splash-glow pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className={cn("loader-logo-enter relative z-10 flex flex-col items-center", reducedMotion && "loader-reduced")}>
        <div className="loader-logo-mark relative grid h-16 w-16 place-items-center rounded-2xl bg-[var(--gradient-primary)] shadow-glow sm:h-[4.5rem] sm:w-[4.5rem]">
          <span className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">N</span>
          <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
          <span className="loader-logo-ring absolute inset-0 rounded-2xl" aria-hidden="true" />
        </div>

        <div className="mt-6 text-center">
          <p className="font-display text-lg font-semibold tracking-[0.12em] text-foreground sm:text-xl">
            NEOMINDS TECH HUB
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground sm:text-sm">
            {site.tagline}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 w-full max-w-xs sm:max-w-sm">
        <NetworkPulse />
      </div>

      <div className="relative z-10 mt-8 h-5 w-full max-w-xs overflow-hidden sm:max-w-sm">
        <p
          key={messageIndex}
          className={cn(
            "loader-message text-center text-sm text-muted-foreground",
            reducedMotion && "loader-reduced",
          )}
        >
          {LOADING_MESSAGES[messageIndex]}
        </p>
      </div>

      <div className="relative z-10 mt-8 w-full max-w-[220px]">
        <div className="loader-progress-track h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div className={cn("loader-progress-bar h-full rounded-full bg-primary", reducedMotion && "loader-reduced")} />
        </div>
      </div>
    </div>
  );
}
