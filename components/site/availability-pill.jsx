import Link from 'next/link';
import { owner } from '@/config/owner';

export function AvailabilityPill({ href = '/contact', label }) {
  const text = label || owner.availability;
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
    >
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-pulse-dot rounded-full bg-emerald-400" />
        <span className="absolute inset-0 rounded-full bg-emerald-400/60" />
      </span>
      <span className="uppercase tracking-[0.18em]">{text}</span>
    </Link>
  );
}
