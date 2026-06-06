import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return <Skeleton className={className} />;
}

export function PageHeaderSkeleton() {
  return (
    <div className="container-x pt-32 pb-12 sm:pt-40">
      <Shimmer className="h-3 w-24 rounded-full" />
      <Shimmer className="mt-5 h-10 w-full max-w-xl rounded-xl" />
      <Shimmer className="mt-4 h-10 w-full max-w-lg rounded-xl" />
      <Shimmer className="mt-5 h-4 w-full max-w-md rounded-lg" />
    </div>
  );
}

export function ServiceCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="container-x pb-16">
      <div className="mb-10 space-y-3">
        <Shimmer className="h-3 w-20 rounded-full" />
        <Shimmer className="h-8 w-72 max-w-full rounded-xl" />
        <Shimmer className="h-4 w-96 max-w-full rounded-lg" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/40 p-7">
            <Shimmer className="h-12 w-12 rounded-xl" />
            <Shimmer className="mt-5 h-6 w-40 rounded-lg" />
            <Shimmer className="mt-3 h-4 w-full rounded-lg" />
            <Shimmer className="mt-2 h-4 w-[85%] rounded-lg" />
            <div className="mt-5 space-y-2">
              <Shimmer className="h-3 w-[75%] rounded-lg" />
              <Shimmer className="h-3 w-[65%] rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IndustryCardsSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="container-x pb-16">
      <div className="mb-10 space-y-3">
        <Shimmer className="h-3 w-28 rounded-full" />
        <Shimmer className="h-8 w-80 max-w-full rounded-xl" />
      </div>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/40 p-6">
            <Shimmer className="h-12 w-12 rounded-xl" />
            <Shimmer className="h-4 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsBarSkeleton() {
  return (
    <div className="container-x pb-16">
      <div className="overflow-hidden rounded-3xl border border-border bg-card/40 p-2">
        <div className="grid divide-y divide-border md:grid-cols-5 md:divide-x md:divide-y-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center px-4 py-8">
              <Shimmer className="h-10 w-24 rounded-lg" />
              <Shimmer className="mt-3 h-3 w-28 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactSkeleton() {
  return (
    <div className="container-x grid gap-8 pb-24 lg:grid-cols-[1fr_1.3fr]">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-5">
            <Shimmer className="h-11 w-11 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-3 w-16 rounded-full" />
              <Shimmer className="h-4 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-card/40 p-6 sm:p-9">
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={cn(i === 3 && "sm:col-span-2")}>
              <Shimmer className="mb-2 h-3 w-20 rounded-full" />
              <Shimmer className="h-11 w-full rounded-xl" />
            </div>
          ))}
          <div className="sm:col-span-2">
            <Shimmer className="mb-2 h-3 w-16 rounded-full" />
            <Shimmer className="h-28 w-full rounded-xl" />
          </div>
        </div>
        <Shimmer className="mt-6 h-11 w-36 rounded-full" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="container-x flex flex-col items-center pt-32 pb-16 text-center sm:pt-40">
      <Shimmer className="h-7 w-56 rounded-full" />
      <Shimmer className="mt-6 h-12 w-full max-w-3xl rounded-xl" />
      <Shimmer className="mt-3 h-12 w-full max-w-2xl rounded-xl" />
      <Shimmer className="mt-6 h-5 w-full max-w-lg rounded-lg" />
      <div className="mt-9 flex gap-3">
        <Shimmer className="h-12 w-36 rounded-full" />
        <Shimmer className="h-12 w-40 rounded-full" />
      </div>
      <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-card/40 px-5 py-5">
            <Shimmer className="mx-auto h-8 w-16 rounded-lg" />
            <Shimmer className="mx-auto mt-2 h-3 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function GenericPageSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />
      <ServiceCardsSkeleton count={3} />
    </>
  );
}

export function HomePageSkeleton() {
  return (
    <>
      <HeroSkeleton />
      <ServiceCardsSkeleton />
      <IndustryCardsSkeleton />
      <StatsBarSkeleton />
    </>
  );
}

export function PagePendingFallback() {
  return (
    <div className="page-pending-fallback min-h-[50dvh] animate-fade-in" role="status" aria-label="Loading page">
      <GenericPageSkeleton />
    </div>
  );
}
