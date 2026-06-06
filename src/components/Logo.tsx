import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Neominds Tech Hub home">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-[var(--gradient-primary)] shadow-glow transition-transform duration-500 group-hover:rotate-6">
        <span className="font-display text-base font-bold text-primary-foreground">N</span>
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-semibold tracking-tight">Neominds</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Tech Hub</span>
        </span>
      )}
    </Link>
  );
}
