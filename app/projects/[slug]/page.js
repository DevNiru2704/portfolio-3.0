import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, Star, GitFork, Users, ShieldCheck } from 'lucide-react';
import { seedProjects } from '@/config/seed';
import { GridBg } from '@/components/site/grid-bg';
import { DeploymentPipeline } from '@/components/site/deployment-pipeline';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  return seedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = seedProjects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
  };
}

function Page({ params }) {
  const project = seedProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative py-14">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All projects
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: `hsl(${project.accent})`, boxShadow: `0 0 12px hsl(${project.accent} / 0.7)` }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {project.category} · {project.year}
            </span>
          </div>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-7xl">
            <span className="text-gradient">{project.title}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-balance text-lg text-muted-foreground">{project.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Live demo <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card/60 px-5 text-sm font-medium backdrop-blur transition-colors hover:border-foreground/30"
              >
                <Github className="h-4 w-4" /> Source
              </a>
            )}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Metric icon={Star} label="Stars" value={project.metrics.stars} />
            <Metric icon={GitFork} label="Forks" value={project.metrics.forks} />
            <Metric icon={Users} label="Users" value={project.metrics.users} />
            <Metric icon={ShieldCheck} label="Uptime" value={project.metrics.uptime || '—'} />
          </div>
        </div>
      </section>

      <section className="container grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
        <div className="space-y-12">
          <Block title="Overview">{project.overview}</Block>
          <Block title="Architecture">{project.architecture}</Block>
          <Block title="Features">
            <ul className="grid gap-2 md:grid-cols-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 rounded-xl border border-border bg-card/50 p-4 text-sm"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--glow-cyan))]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Challenges & Solutions">{project.challenges}</Block>
          <Block title="Tradeoffs">{project.tradeoffs}</Block>
          <Block title="Performance">{project.performance}</Block>

          <div>
            <SectionEyebrow>Deployment pipeline</SectionEyebrow>
            <div className="mt-3">
              <DeploymentPipeline />
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <SidebarCard title="Stack">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-md bg-secondary/50 font-mono text-[10px] font-normal text-muted-foreground"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </SidebarCard>
          <SidebarCard title="Status">
            <div className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="capitalize">{project.status}</span>
            </div>
          </SidebarCard>
          <SidebarCard title="Links">
            <ul className="space-y-2 text-sm">
              {project.live && (
                <li>
                  <a href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground hover:underline">
                    Live <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              )}
              {project.github && (
                <li>
                  <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-foreground hover:underline">
                    GitHub <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
              )}
            </ul>
          </SidebarCard>

          <SidebarCard title="Other projects">
            <ul className="space-y-2">
              {seedProjects.filter((p) => p.slug !== project.slug).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-foreground/20"
                  >
                    <span>{p.title}</span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </SidebarCard>
        </aside>
      </section>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-4">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1.5 text-xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
function SectionEyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
      <span className="h-1 w-1 rounded-full bg-[hsl(var(--glow-cyan))]" />
      {children}
    </div>
  );
}
function Block({ title, children }) {
  return (
    <div>
      <SectionEyebrow>{title}</SectionEyebrow>
      <p className="mt-3 max-w-prose text-balance leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}
function SidebarCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default Page;
