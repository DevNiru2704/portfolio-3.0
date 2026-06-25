import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden mask-fade-b", className)}>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap py-2">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
