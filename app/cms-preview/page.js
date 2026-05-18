'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Bell,
  ChevronRight,
  Code2,
  Eye,
  FileText,
  FlaskConical,
  Globe2,
  Image as ImageIcon,
  LayoutDashboard,
  LineChart,
  Mail,
  Plus,
  Save,
  Search,
  Sparkles,
  Terminal as TerminalIcon,
  Upload,
  Users,
  Lock,
  AlertTriangle,
  Send,
  Wand2,
  CheckCircle2,
  GitBranch,
  Activity,
  Bot,
  Settings,
  Filter,
  Layers,
} from 'lucide-react';
import { seedProjects, seedBlog, seedSystemStatus, seedGitHubStats, seedLab } from '@/config/seed';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'media', label: 'Media', icon: ImageIcon },
  { id: 'messages', label: 'Messages', icon: Mail, badge: 12 },
  { id: 'lab', label: 'Lab', icon: FlaskConical },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
  { id: 'deploys', label: 'Deployments', icon: GitBranch },
  { id: 'ai', label: 'AI Assistant', icon: Bot },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function CmsPreview() {
  const [view, setView] = useState('overview');

  return (
    <div className="relative">
      {/* Banner */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-300">
              <AlertTriangle className="h-3 w-3" />
              read-only preview
            </span>
            <span className="text-muted-foreground">
              This is a live preview of the CMS powering this portfolio. All data shown is for demonstration.
            </span>
          </div>
          <Link href="/dashboard" className="inline-flex items-center gap-1 text-foreground hover:underline">
            Open private dashboard <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="container grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="sticky top-32 self-start">
          <div className="rounded-2xl border border-border bg-card/60 p-3">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <span className="grid h-7 w-7 place-items-center rounded-md border border-border bg-background text-[10px] font-semibold">
                <span className="text-gradient-accent">NM</span>
              </span>
              <div className="leading-none">
                <div className="text-xs font-semibold">NIRMALYA</div>
                <div className="font-mono text-[10px] text-muted-foreground">CMS · demo</div>
              </div>
            </div>
            <div className="mt-3 space-y-0.5">
              {NAV.map((n) => {
                const active = n.id === view;
                return (
                  <button
                    key={n.id}
                    onClick={() => setView(n.id)}
                    className={cn(
                      'group flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                      active
                        ? 'bg-foreground/10 text-foreground'
                        : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <n.icon className="h-3.5 w-3.5" />
                      {n.label}
                    </span>
                    {n.badge ? (
                      <span className="rounded-full bg-foreground px-1.5 py-0.5 font-mono text-[10px] text-background">
                        {n.badge}
                      </span>
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-xl border border-border bg-background p-3">
              <div className="flex items-center gap-2 text-xs">
                <Lock className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Read-only mode</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                Editing is disabled in the public preview. Open the private dashboard to make changes.
              </p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div>
          {view === 'overview' && <Overview />}
          {view === 'projects' && <ProjectsManager />}
          {view === 'blog' && <BlogManager />}
          {view === 'media' && <MediaPanel />}
          {view === 'messages' && <MessagesPanel />}
          {view === 'lab' && <LabPanel />}
          {view === 'analytics' && <AnalyticsPanel />}
          {view === 'deploys' && <DeploysPanel />}
          {view === 'ai' && <AssistantPanel />}
          {view === 'settings' && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}

// ------ Sub-views ------
function TopBar({ title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 pb-5">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{subtitle}</div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-gradient">{title}</h2>
      </div>
      {actions}
    </div>
  );
}

function Overview() {
  const metrics = [
    { label: 'Visitors (7d)', value: '8,214', delta: '+12.4%', up: true },
    { label: 'Projects', value: '12', delta: '+1', up: true },
    { label: 'Posts', value: '27', delta: '+3', up: true },
    { label: 'Messages', value: '184', delta: '+22', up: true },
  ];
  return (
    <div>
      <TopBar
        title="Welcome back, Nirmalya."
        subtitle="control center · last 7 days"
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-background opacity-60">
            <Plus className="h-3.5 w-3.5" /> New entry
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5"
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>{m.label}</span>
              <span className={cn('rounded-full px-1.5 py-0.5 text-[10px]', m.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400')}>
                {m.delta}
              </span>
            </div>
            <div className="mt-2 text-3xl font-semibold tabular-nums">{m.value}</div>
            <Spark />
          </motion.div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <Panel title="Live system status" subtitle="production" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {seedSystemStatus.services.map((s) => (
              <li key={s.name} className="flex items-center justify-between py-2.5 text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                  {s.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ['Uptime 90d', seedSystemStatus.metrics.uptime90d],
              ['P95', seedSystemStatus.metrics.p95Latency],
              ['Build success', seedSystemStatus.metrics.buildSuccess],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-border bg-background p-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div>
                <div className="text-sm font-semibold tabular-nums">{v}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent deploys" subtitle="vercel">
          <ul className="space-y-2">
            {seedSystemStatus.deploys.map((d) => (
              <li key={d.sha} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3">
                <span className="mt-1 grid h-6 w-6 place-items-center rounded-md border border-border bg-card">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {d.ref} · {d.sha}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">{d.duration}</span>
                  </div>
                  <div className="truncate text-sm">{d.message}</div>
                  <div className="text-[10px] text-muted-foreground">{d.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <Panel title="Top content" subtitle="7d" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {[
              { t: 'Why I Switched to Arch Linux + Hyprland', v: 2412, type: 'post' },
              { t: 'InfraPilot — Case Study', v: 1842, type: 'project' },
              { t: 'Building Production-Grade Terraform Pipelines', v: 1238, type: 'post' },
              { t: 'DevSync — Case Study', v: 1110, type: 'project' },
              { t: 'Fine-Tuning LLMs with LoRA', v: 928, type: 'post' },
            ].map((row, i) => (
              <li key={row.t} className="flex items-center gap-3 py-2.5 text-sm">
                <span className="w-5 text-right font-mono text-[11px] text-muted-foreground">{i + 1}</span>
                <span className="flex-1 truncate">{row.t}</span>
                <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {row.type}
                </span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">{row.v.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="AI Assistant" subtitle="v1 · ready">
          <AssistantMini />
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, children, className }) {
  return (
    <section className={cn('rounded-2xl border border-border bg-card/60 p-5', className)}>
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{subtitle}</div>
          <div className="text-sm font-semibold">{title}</div>
        </div>
        <button className="text-xs text-muted-foreground hover:text-foreground" aria-label="More">
          <Filter className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function Spark() {
  // Simple sparkline using SVG, deterministic-ish
  const points = [4, 8, 6, 12, 9, 14, 11, 16, 13, 18, 14, 22, 20, 24].map((y, i) => `${i * 8},${30 - y}`).join(' ');
  return (
    <svg viewBox="0 0 112 32" className="mt-3 h-8 w-full">
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--glow-cyan))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={`${points} 112,32 0,32`}
        fill="hsl(var(--glow-cyan) / 0.12)"
        stroke="none"
      />
    </svg>
  );
}

function ProjectsManager() {
  return (
    <div>
      <TopBar
        title="Projects"
        subtitle="manage · read-only"
        actions={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search…"
                className="h-9 w-56 rounded-full border border-border bg-card/60 pl-8 pr-3 text-xs placeholder:text-muted-foreground focus:outline-none"
                disabled
              />
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs text-background opacity-60">
              <Plus className="h-3.5 w-3.5" /> New
            </button>
          </div>
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/40 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Stars</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {seedProjects.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-none hover:bg-foreground/[0.03]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: `hsl(${p.accent})` }}
                    />
                    <span className="font-medium">{p.title}</span>
                    {p.featured && (
                      <Badge variant="secondary" className="rounded-md bg-secondary/50 font-mono text-[9px] uppercase text-muted-foreground">
                        featured
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">/projects/{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 tabular-nums">{p.metrics.stars}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Preview <Eye className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BlogManager() {
  const post = seedBlog[0];
  return (
    <div>
      <TopBar title="Markdown editor" subtitle="blog · draft preview" actions={
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card/60 px-4 text-xs text-muted-foreground opacity-60">
            <Eye className="h-3.5 w-3.5" /> Preview
          </button>
          <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs text-background opacity-60">
            <Save className="h-3.5 w-3.5" /> Save draft
          </button>
        </div>
      } />
      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Editor" subtitle="markdown · mdx">
          <pre className="scrollbar-thin h-[420px] overflow-auto rounded-xl border border-border bg-background p-4 font-mono text-[12px] leading-relaxed text-foreground/90">
{`# ${post.title}

> ${post.excerpt}

## Background

${post.body}

\`\`\`bash
# example install
yarn create next-app neural-cmd --typescript
\`\`\`
`}
          </pre>
        </Panel>
        <Panel title="Live preview" subtitle="rendered">
          <article className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold tracking-tight">{post.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <hr className="my-4 border-border" />
            <h3 className="text-base font-semibold">Background</h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.body}</p>
          </article>
        </Panel>
      </div>
    </div>
  );
}

function MediaPanel() {
  return (
    <div>
      <TopBar title="Media library" subtitle="uploads · r2" actions={
        <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs text-background opacity-60">
          <Upload className="h-3.5 w-3.5" /> Upload
        </button>
      } />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card/60">
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(80% 80% at ${20 + i * 8}% ${30 + i * 5}%, hsl(${
                  ['199 89% 74%', '213 94% 78%', '250 91% 85%', '30 80% 65%'][i % 4]
                } / 0.35), transparent 60%), linear-gradient(140deg, hsl(var(--surface-2)), hsl(var(--surface-3)))`,
              }}
            />
            <div className="absolute inset-0 bg-grid-sm opacity-[0.08]" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>asset-0{i + 1}.webp</span>
              <span>{1200 + i * 13}KB</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPanel() {
  const samples = [
    { name: 'Ananya Sharma', email: 'ananya@fintechco.io', subject: 'Infrastructure consulting', preview: 'Hi Nirmalya — we’re building a payments backbone…', when: '2h', unread: true },
    { name: 'Marcus Lee', email: 'marcus@devtools.dev', subject: 'Open source collaboration', preview: 'Loved DevSync. Any chance you’d be open to…', when: '8h', unread: true },
    { name: 'Priya Iyer', email: 'priya@ai.infra', subject: 'Engineering lead role', preview: 'Following up on the call — we’re ready to make…', when: '1d', unread: false },
    { name: 'Sam Patel', email: 'sam@gridworks.io', subject: 'Terraform pipeline help', preview: 'Read your post on production Terraform…', when: '2d', unread: false },
  ];
  return (
    <div>
      <TopBar title="Messages" subtitle={`${samples.filter((s) => s.unread).length} unread`} />
      <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
        <ul className="divide-y divide-border">
          {samples.map((m, i) => (
            <li key={i} className="flex items-start gap-3 px-5 py-4 hover:bg-foreground/[0.03]">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-xs font-semibold">
                {m.name.split(' ').map((n) => n[0]).join('')}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate text-sm font-medium">{m.name}</span>
                    {m.unread && <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--glow-cyan))]" />}
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{m.when}</span>
                </div>
                <div className="truncate text-xs text-muted-foreground">{m.email} · {m.subject}</div>
                <p className="mt-1 truncate text-sm text-foreground/80">{m.preview}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LabPanel() {
  return (
    <div>
      <TopBar title="Lab experiments" subtitle={`${seedLab.length} total`} />
      <div className="grid gap-3 md:grid-cols-2">
        {seedLab.map((l) => (
          <div key={l.id} className="rounded-2xl border border-border bg-card/60 p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{l.status}</span>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{l.progress}%</span>
            </div>
            <h3 className="mt-2 text-base font-semibold">{l.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{l.description}</p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-[hsl(var(--glow-cyan))]" style={{ width: `${l.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const buckets = [12, 14, 9, 16, 22, 19, 14, 18, 24, 28, 22, 18, 26, 32, 28, 30, 27, 22, 18, 14, 11, 9, 12, 8];
  const max = Math.max(...buckets);
  return (
    <div>
      <TopBar title="Analytics" subtitle="site · last 24h" />
      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Pageviews" subtitle="hourly">
          <div className="flex h-[220px] items-end gap-1">
            {buckets.map((b, i) => (
              <div key={i} className="flex-1 rounded-t-md" style={{ height: `${(b / max) * 100}%`, background: `linear-gradient(to top, hsl(var(--glow-cyan) / 0.15), hsl(var(--glow-cyan) / 0.6))` }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
          </div>
        </Panel>
        <Panel title="Top languages" subtitle="github">
          <ul className="space-y-3">
            {seedGitHubStats.topLanguages.map((l) => (
              <li key={l.name}>
                <div className="flex justify-between text-xs">
                  <span>{l.name}</span>
                  <span className="font-mono tabular-nums text-muted-foreground">{l.percentage}%</span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full" style={{ width: `${l.percentage}%`, background: `hsl(${l.color})` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function DeploysPanel() {
  return (
    <div>
      <TopBar title="Deployments" subtitle="vercel · production" />
      <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-background/40 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Ref</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">When</th>
            </tr>
          </thead>
          <tbody>
            {seedSystemStatus.deploys.map((d) => (
              <tr key={d.sha} className="border-b border-border last:border-none">
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{d.ref} · {d.sha}</td>
                <td className="px-4 py-3">{d.message}</td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums">{d.duration}</td>
                <td className="px-4 py-3 text-muted-foreground">{d.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AssistantPanel() {
  return (
    <div>
      <TopBar title="AI Assistant" subtitle="v1 · rag-enabled" />
      <Panel title="Ask anything about my work" subtitle="embeddings · chroma">
        <AssistantMini big />
      </Panel>
    </div>
  );
}
function AssistantMini({ big = false }) {
  return (
    <div>
      <div className={cn('space-y-2 overflow-auto pr-1 scrollbar-thin', big ? 'max-h-[420px]' : 'max-h-[180px]')}>
        <Bubble role="user">What’s the architecture of DevSync?</Bubble>
        <Bubble role="ai">
          DevSync is a Next.js App Router app with Supabase Realtime for collaborative state. Authentication is via Clerk; analytics flow through Vercel + a custom RUM endpoint. Bundle stays under 150KB initial JS.
        </Bubble>
        <Bubble role="user">Compare it to InfraPilot.</Bubble>
        <Bubble role="ai">
          InfraPilot is a Go CLI that translates NL → Terraform plans, gated by a static analysis layer. It’s a much smaller surface area than DevSync but with stricter safety properties.
        </Bubble>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background pr-1 pl-3">
        <Wand2 className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          placeholder="Ask the AI assistant… (preview)"
          disabled
          className="h-9 flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        <button className="inline-grid h-7 w-7 place-items-center rounded-full bg-foreground text-background opacity-60">
          <Send className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
function Bubble({ role, children }) {
  const isAi = role === 'ai';
  return (
    <div className={cn('flex', isAi ? 'justify-start' : 'justify-end')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed',
          isAi ? 'bg-card/80 border border-border text-foreground/90' : 'bg-foreground text-background',
        )}
      >
        {children}
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div>
      <TopBar title="Settings" subtitle="site · seo · integrations" />
      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Site" subtitle="general">
          <Setting k="Site name" v="NIRMALYA · Neural Command Interface" />
          <Setting k="Default theme" v="system" />
          <Setting k="Locale" v="en-IN" />
        </Panel>
        <Panel title="Integrations" subtitle="connected">
          <Setting k="Vercel" v="production" ok />
          <Setting k="GitHub" v="@nirmalya" ok />
          <Setting k="Supabase" v="prod · db-east-1" ok />
          <Setting k="OpenAI" v="gpt-4o" ok />
        </Panel>
        <Panel title="SEO" subtitle="meta">
          <Setting k="Title template" v="%s · NIRMALYA" />
          <Setting k="OG image" v="/og.png" />
          <Setting k="Sitemap" v="/sitemap.xml" />
        </Panel>
        <Panel title="Analytics" subtitle="events">
          <Setting k="Vercel Analytics" v="enabled" ok />
          <Setting k="Plausible" v="nirmalya.dev" ok />
          <Setting k="Custom RUM" v="/api/rum" ok />
        </Panel>
      </div>
    </div>
  );
}
function Setting({ k, v, ok }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 text-sm last:border-none">
      <span className="text-muted-foreground">{k}</span>
      <span className="flex items-center gap-2 font-mono text-xs">
        {v}
        {ok && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
      </span>
    </div>
  );
}

function App() {
  return <CmsPreview />;
}
export default App;
