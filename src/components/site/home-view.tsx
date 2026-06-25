"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Command, Github, Mail, Sparkles, Cpu, Activity, Zap, ChevronRight, CircleDot } from "lucide-react";
import { owner } from "@/config/owner";
import { experience, testimonials, systemStatus } from "@/config/content";
import type { Project, Lab } from "@/types/content";
import { AvailabilityPill } from "@/components/site/availability-pill";
import { MagneticButton } from "@/components/site/magnetic-button";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { StackOrbit } from "@/components/site/stack-orbit";
import { GitHubHeatmap } from "@/components/site/github-heatmap";
import { DeploymentPipeline } from "@/components/site/deployment-pipeline";
import { SystemStatusPanel } from "@/components/site/system-status";
import { Terminal } from "@/components/site/terminal";
import { Marquee } from "@/components/site/marquee";
import { GridBg } from "@/components/site/grid-bg";
import { useCommandPalette } from "@/components/site/command-palette";

interface HomeViewProps {
  projects: Project[];
  labs: Lab[];
}

export function HomeView({ projects, labs }: HomeViewProps) {
  const palette = useCommandPalette();

  return (
    <div>
      {/* ---------------- HERO ---------------- */}
      <section className="relative isolate overflow-hidden">
        <GridBg />
        <div className="container relative pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="flex flex-col items-start gap-6">
            <AvailabilityPill label="Available · Freelance + Full-time" />
            <h1 className="font-display text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
              <span className="block text-gradient">FULL STACK</span>
              <span className="block text-gradient">ENGINEER · SYSTEMS</span>
              <span className="block">
                <span className="text-gradient-accent">DEVELOPER</span> <span className="text-muted-foreground/60">·</span>{" "}
                <span className="text-gradient">AI + INFRA</span>
              </span>
            </h1>
            <p className="max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">{owner.tagline}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <MagneticButton href="/projects">
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton variant="ghost" href="/cms-preview">
                <Sparkles className="h-4 w-4" />
                Live CMS Preview
              </MagneticButton>
              <button
                onClick={() => palette.setOpen(true)}
                className="group inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/60 pl-4 pr-1 text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
              >
                <Command className="h-4 w-4" />
                Press <kbd className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px]">⌘K</kbd>
              </button>
            </div>
          </div>

          {/* Hero composition: command bar preview + system status */}
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <CommandPreview onOpen={() => palette.setOpen(true)} />
            <SystemStatusPanel />
          </div>

          <Marquee
            className="mt-10"
            items={[
              "NEURAL COMMAND INTERFACE",
              "BUILT WITH NEXT.JS · TYPESCRIPT · TAILWIND",
              owner.location,
              owner.timezone,
              "◎ p95 74ms",
              "◎ uptime 99.98%",
              "CI/CD · EDGE · STREAMING",
            ]}
          />
        </div>
      </section>

      {/* ---------------- FEATURED PROJECTS ---------------- */}
      <section className="container py-20">
        <SectionHeading
          eyebrow="Featured Work"
          title="Selected projects, engineered end to end."
          description="Real systems shipped to real users. Each is a full case study — architecture, tradeoffs, and the receipts."
        >
          <div className="absolute right-0 top-1">
            <Link href="/projects" className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
              All projects <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* ---------------- STACK ORBIT ---------------- */}
      <section className="container py-20">
        <SectionHeading
          eyebrow="Stack Visualization"
          title="The toolchain, by layer."
          description="Click a layer to inspect the tools. The orbit shows current operating context — not a badge cloud."
        />
        <div className="rounded-3xl border border-border bg-card/40 p-8 md:p-12">
          <StackOrbit />
        </div>
      </section>

      {/* ---------------- GITHUB + PIPELINE ---------------- */}
      <section className="container py-20">
        <SectionHeading
          eyebrow="Engineering Telemetry"
          title="GitHub activity · deployment pipeline"
          description="Tracked the same way I'd track a production service. Live signals, not vanity metrics."
        />
        <div className="grid gap-5 lg:grid-cols-1">
          <GitHubHeatmap />
          <DeploymentPipeline />
        </div>
      </section>

      {/* ---------------- TIMELINE ---------------- */}
      <section className="container py-20">
        <SectionHeading
          eyebrow="Experience"
          title="A short engineering history."
          description="From first Django app to building autonomous infrastructure agents."
        />
        <ol className="relative grid gap-4 md:grid-cols-5">
          {experience.map((e, i) => (
            <motion.li
              key={e.year}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06 }}
              className="relative rounded-2xl border border-border bg-card/60 p-5"
            >
              <div className="flex items-center gap-2">
                <CircleDot className="h-3.5 w-3.5 text-[hsl(var(--glow-cyan))]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{e.year}</span>
              </div>
              <div className="mt-2 text-sm font-semibold">{e.title}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{e.description}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ---------------- CMS PREVIEW TEASER + LAB ---------------- */}
      <section className="container py-20">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Link
            href="/cms-preview"
            className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 transition-colors hover:border-foreground/20"
          >
            <div className="absolute inset-0 bg-grid-sm opacity-[0.04]" />
            <div className="relative flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-[hsl(var(--glow-cyan))]" />
                  CMS Preview
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">The dashboard that runs this site.</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  Live, public, read-only walkthrough of the real CMS — analytics, project manager, markdown editor,
                  deployment logs.
                </p>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="relative mt-8 grid grid-cols-3 gap-3 text-xs">
              {["Projects", "Posts", "Messages"].map((l, i) => (
                <div key={l} className="rounded-xl border border-border bg-background p-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
                  <div className="mt-1 text-xl font-semibold tabular-nums text-gradient-accent">{[12, 27, 184][i]}</div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-[hsl(var(--glow-cyan))]" style={{ width: `${[60, 80, 45][i]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Link>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-6">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Lab · experiments</div>
              <Link href="/lab" className="text-xs text-muted-foreground hover:text-foreground">
                view all →
              </Link>
            </div>
            <ul className="mt-4 space-y-2">
              {labs.slice(0, 4).map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 truncate">
                    <span className={`h-1.5 w-1.5 rounded-full ${l.status === "Done" ? "bg-emerald-400" : "bg-amber-400 animate-pulse-dot"}`} />
                    <span className="truncate">{l.title}</span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{l.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- TERMINAL ---------------- */}
      <section className="container py-20">
        <SectionHeading
          eyebrow="Interactive Terminal"
          title="Talk to my system."
          description="A real terminal, real commands. Try whoami, skills, projects, stack, status, contact, clear."
        />
        <Terminal />
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="container py-20">
        <SectionHeading eyebrow="Signal" title="What people say after working with me." />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6"
            >
              <div className="absolute -right-6 -top-6 text-7xl font-bold text-muted/30">&rdquo;</div>
              <blockquote className="relative text-sm leading-relaxed text-foreground/90">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="relative mt-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-xs font-semibold" aria-hidden>
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{t.name}</span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="container pb-24 pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/40 p-10 md:p-16">
          <div className="absolute inset-0 bg-grid mask-radial opacity-30" />
          <div
            className="absolute -top-32 left-1/2 h-[300px] w-[800px] -translate-x-1/2 rounded-full blur-3xl opacity-50"
            style={{ background: "radial-gradient(60% 60% at 50% 50%, hsl(var(--glow-cyan) / 0.18), transparent 60%)" }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">let&apos;s build</div>
              <h3 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
                <span className="text-gradient">Have a system in mind?</span>
                <br />
                <span className="text-gradient-accent">Let&apos;s engineer it together.</span>
              </h3>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Currently available for freelance and full-time roles. Based in {owner.location} · working with teams
                worldwide.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <MagneticButton href="/contact">
                  <Mail className="h-4 w-4" /> Start a conversation
                </MagneticButton>
                <MagneticButton variant="ghost" href={owner.github} external>
                  <Github className="h-4 w-4" /> @{owner.githubUser}
                </MagneticButton>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                { icon: Activity, label: "Avg response", value: "≤ 24h" },
                { icon: Cpu, label: "Active projects", value: systemStatus.metrics.activeProjects },
                { icon: Zap, label: "P95 latency", value: systemStatus.metrics.p95Latency },
              ].map((m) => (
                <div key={m.label} className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <m.icon className="h-4 w-4" /> {m.label}
                  </div>
                  <div className="font-mono text-sm tabular-nums text-foreground">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CommandPreview({ onOpen }: { onOpen: () => void }) {
  const rows = [
    { label: "View Projects", hint: "→ /projects", icon: "P" },
    { label: "Toggle Dark Mode", hint: "theme", icon: "T" },
    { label: "Open CMS Preview", hint: "→ /cms-preview", icon: "C" },
    { label: "Jump to terminal", hint: "section", icon: "$" },
  ];
  return (
    <button
      onClick={onOpen}
      className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card/70 p-1 text-left backdrop-blur shadow-[0_30px_120px_-40px_hsl(var(--glow-cyan)/0.25)]"
      aria-label="Open command palette"
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <Command className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Search projects, switch theme, jump anywhere…</span>
        <kbd className="ml-auto rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </div>
      <div className="divide-y divide-border">
        {rows.map((row, i) => (
          <div key={row.label} className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${i === 0 ? "bg-foreground/[0.04]" : ""}`}>
            <span className="grid h-6 w-6 place-items-center rounded-md border border-border bg-background font-mono text-[10px] text-muted-foreground">
              {row.icon}
            </span>
            <span className="text-sm text-foreground">{row.label}</span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{row.hint}</span>
          </div>
        ))}
      </div>
    </button>
  );
}
