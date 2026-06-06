import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { RoutePendingShell } from "./components/loading/RoutePendingShell";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingMinMs: 320,
    defaultPendingMs: 520,
    defaultPendingComponent: RoutePendingShell,
  });

  return router;
};
