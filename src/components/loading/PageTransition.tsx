import { Outlet, useRouterState } from "@tanstack/react-router";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function AnimatedOutlet() {
  const isPending = useRouterState({ select: (s) => s.status === "pending" });
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div
        className={cn(
          "page-transition-content",
          isPending && "page-transition-content-pending",
          reducedMotion && "page-transition-reduced",
        )}
      >
        <Outlet />
      </div>
      <PageTransitionOverlay visible={isPending} />
    </>
  );
}

function PageTransitionOverlay({ visible }: { visible: boolean }) {
  const reducedMotion = useReducedMotion();

  if (!visible) return null;

  return (
    <div
      className={cn(
        "page-transition-overlay pointer-events-none fixed inset-0 z-40 flex items-start justify-center",
        reducedMotion && "page-transition-reduced",
      )}
      aria-hidden="true"
    >
      <div className="page-transition-bar mt-[4.25rem] h-0.5 w-full max-w-md overflow-hidden rounded-full bg-white/[0.04] sm:mt-20">
        <div className="page-transition-bar-fill h-full rounded-full bg-primary" />
      </div>
      <div className="page-transition-pulse absolute left-1/2 top-[5.5rem] -translate-x-1/2 sm:top-[5.75rem]">
        <span className="page-transition-dot" />
        <span className="page-transition-dot page-transition-dot-2" />
        <span className="page-transition-dot page-transition-dot-3" />
      </div>
    </div>
  );
}
