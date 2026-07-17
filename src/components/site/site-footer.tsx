import Link from "next/link";
import type { ComponentType } from "react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { owner, navigation, secondaryNav, type NavItem } from "@/config/owner";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-30" />
      {/* Two columns on small screens so Site and More sit side by side rather
          than stacking into a long scroll; brand and status span both. */}
      <div className="container relative grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 min-w-0 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            {/* Bare, matching the nav: the footer sits on the dark background too.
                Only the favicon keeps a plate, for light browser tab strips. */}
            <BrandMark className="h-7 w-7 shrink-0 text-signal" />
            <div className="leading-none">
              <div className="text-sm font-semibold">{owner.brand.name}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{owner.brand.productLine}</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{owner.tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <SocialIcon href={owner.github} icon={Github} label="GitHub" />
            <SocialIcon href={owner.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialIcon href="/contact" icon={Mail} label="Email" external={false} />
          </div>
        </div>

        <FooterCol title="Site" items={navigation.slice(0, 4)} />
        <FooterCol title="More" items={[...navigation.slice(4), ...secondaryNav]} />

        <div className="col-span-2 min-w-0 lg:col-span-1">
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Status</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-pulse-dot rounded-full bg-emerald-400" />
                <span className="absolute inset-0 rounded-full bg-emerald-400/60" />
              </span>
              <span className="text-muted-foreground">All systems operational</span>
            </li>
            <li className="text-muted-foreground">
              {owner.location} · {owner.timezone}
            </li>
            <li>
              <Link href="/contact" className="group inline-flex items-center gap-1 text-foreground hover:underline">
                {owner.availability.split(".")[0]}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container relative flex flex-col items-start justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <div>
          © {year} {owner.name}. Engineered with restraint.
        </div>
        <div className="font-mono">v1.0.0</div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
  external = true,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}) {
  const className =
    "group inline-grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground";

  if (!external) {
    return (
      <Link href={href} aria-label={label} className={className}>
        <Icon className="h-4 w-4" />
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={className}>
      <Icon className="h-4 w-4" />
    </a>
  );
}

function FooterCol({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="min-w-0">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.href}>
            <Link className="text-muted-foreground transition-colors hover:text-foreground" href={it.href}>
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
