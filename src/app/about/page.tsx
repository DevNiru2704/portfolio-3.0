import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Github, Linkedin, Mail, Twitter, Code2, Terminal as TerminalIcon, Cpu } from "lucide-react";
import { owner } from "@/config/owner";
import { experience, stack } from "@/config/content";
import { GridBg } from "@/components/site/grid-bg";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "About",
  description: owner.bio,
};

const workstation = [
  { icon: TerminalIcon, k: "OS", v: "Arch Linux + Hyprland" },
  { icon: Code2, k: "Editor", v: "Neovim + tmux" },
  { icon: Cpu, k: "Languages", v: "TS · Go · Python · Rust" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative grid gap-10 py-16 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-1 w-1 rounded-full bg-[hsl(var(--glow-cyan))]" />
              About · {owner.location}
            </div>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              <span className="text-gradient">Engineer, by intent.</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              {owner.bio} He runs Arch Linux with Hyprland, uses Neovim as his primary editor, and believes deeply in
              automation, clean architecture, and performance-first engineering.
            </p>
            <p className="mt-3 max-w-xl text-muted-foreground">
              His stack spans React, Next.js, Django, PostgreSQL, Docker, Terraform, and Go. He is currently exploring
              AI/ML systems, fine-tuning LLMs, and building developer tools that remove friction from engineering
              workflows.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Social icon={Github} href={owner.github} label="GitHub" />
              <Social icon={Linkedin} href={owner.linkedin} label="LinkedIn" />
              <Social icon={Twitter} href={owner.twitter} label="Twitter/X" />
              <Social icon={Mail} href={`mailto:${owner.email}`} label="Email" />
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">workstation</div>
              <ul className="mt-4 space-y-2 text-sm">
                {workstation.map((r) => (
                  <li key={r.k} className="flex items-center justify-between border-b border-border last:border-none pb-2 last:pb-0">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <r.icon className="h-3.5 w-3.5" />
                      {r.k}
                    </span>
                    <span className="font-mono text-xs">{r.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <SectionHeading eyebrow="Timeline" title="How the engineering arc has unfolded." />
        <div className="relative">
          <div className="absolute left-3 top-3 hidden h-[calc(100%-24px)] w-px bg-border md:block" />
          <ol className="space-y-4 md:space-y-0">
            {experience.map((e) => (
              <li key={e.year} className="relative rounded-2xl border border-border bg-card/60 p-6 md:ml-12">
                <span className="absolute -left-11 top-7 hidden h-3 w-3 rounded-full bg-[hsl(var(--glow-cyan))] shadow-[0_0_10px_hsl(var(--glow-cyan))] md:block" />
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{e.year}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
                <h3 className="mt-2 text-lg font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container py-14">
        <SectionHeading eyebrow="Tools" title="Stack at a glance." />
        <div className="grid gap-3 md:grid-cols-5">
          {Object.entries(stack).map(([layer, items]) => (
            <div key={layer} className="rounded-2xl border border-border bg-card/60 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{layer}</div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {items.map((it) => (
                  <li key={it} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-[hsl(var(--glow-cyan))]" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Social({ icon: Icon, href, label }: { icon: ComponentType<{ className?: string }>; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card/60 px-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="h-4 w-4" /> {label}
    </a>
  );
}
