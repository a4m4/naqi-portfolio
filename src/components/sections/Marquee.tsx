import { clients } from "@/data/site";

/** Infinite horizontal ticker of client / collaborator names. */
export function Marquee({ items = clients, label }: { items?: string[]; label?: string }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-6 md:py-8" aria-label={label}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
      <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused] md:gap-20">
        {row.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="flex items-center gap-12 whitespace-nowrap font-display text-2xl font-bold text-white/40 md:gap-20 md:text-4xl"
            aria-hidden={i >= items.length}
          >
            {c}
            <span className="size-1.5 rounded-full bg-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}
