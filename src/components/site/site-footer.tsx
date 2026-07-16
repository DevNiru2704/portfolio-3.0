import Link from "next/link";
import type { ComponentType } from "react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { owner, navigation, secondaryNav, type NavItem } from "@/config/owner";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial opacity-30" />
      <div className="container relative grid gap-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-[10px] font-bold">
              <span className="text-gradient-accent">{owner.brand.initials}</span>
            </span>
            <div className="leading-none">
              <div className="text-sm font-semibold">{owner.brand.name}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{owner.brand.productLine}</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{owner.tagline}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <SocialIcon href={owner.github} icon={Github} label="GitHub" />
            <SocialIcon href={owner.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialIcon href={`mailto:${owner.email}`} icon={Mail} label="Email" />
          </div>
        </div>

        <FooterCol title="Site" items={navigation.slice(0, 4)} />
        <FooterCol title="More" items={[...navigation.slice(4), ...secondaryNav]} />

        <div>
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

function SocialIcon({ href, icon: Icon, label }: { href: string; icon: ComponentType<{ className?: string }>; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group inline-grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

function FooterCol({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
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
