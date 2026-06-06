import { useRouterState } from "@tanstack/react-router";

import {
  ContactSkeleton,
  GenericPageSkeleton,
  HomePageSkeleton,
  IndustryCardsSkeleton,
  PageHeaderSkeleton,
  ServiceCardsSkeleton,
  StatsBarSkeleton,
} from "./skeletons";

export function RoutePendingShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="page-pending-fallback min-h-[50dvh] animate-fade-in" role="status" aria-label="Loading page">
      {pathname === "/" && <HomePageSkeleton />}
      {pathname === "/services" && (
        <>
          <PageHeaderSkeleton />
          <ServiceCardsSkeleton />
        </>
      )}
      {pathname === "/industries" && (
        <>
          <PageHeaderSkeleton />
          <IndustryCardsSkeleton />
        </>
      )}
      {pathname === "/contact" && (
        <>
          <PageHeaderSkeleton />
          <ContactSkeleton />
        </>
      )}
      {pathname === "/training" && (
        <>
          <PageHeaderSkeleton />
          <ServiceCardsSkeleton count={3} />
        </>
      )}
      {pathname === "/about" && (
        <>
          <PageHeaderSkeleton />
          <StatsBarSkeleton />
          <ServiceCardsSkeleton count={3} />
        </>
      )}
      {!["/", "/services", "/industries", "/contact", "/training", "/about"].includes(pathname) && (
        <GenericPageSkeleton />
      )}
    </div>
  );
}
