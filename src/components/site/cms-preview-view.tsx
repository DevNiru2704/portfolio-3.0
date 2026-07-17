"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  Eye,
  FileText,
  FlaskConical,
  Image as ImageIcon,
  LayoutDashboard,
  LineChart,
  Mail,
  Plus,
  Save,
  Search,
  Lock,
  AlertTriangle,
  Send,
  Wand2,
  CheckCircle2,
  GitBranch,
  Bot,
  Settings,
  Filter,
  Upload,
  Atom,
  GripVertical,
  Radio,
  Menu,
  X,
} from "lucide-react";
import type { Project, BlogPost, Lab, Principle, NowItem, NowCategory } from "@/types/content";
import { BrandMark } from "@/components/site/brand-mark";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample data for this concept demo only. Nothing below reflects real
// telemetry - the page is a read-only UI showcase seeded with fake numbers.
const systemStatus = {
  services: [
    { name: "Portfolio", state: "operational", label: "Online" },
    { name: "API", state: "operational", label: "Operational" },
    { name: "Database", state: "operational", label: "Operational" },
    { name: "Edge Network", state: "operational", label: "Operational" },
  ],
  metrics: {
    lastDeploy: "2 hours ago",
    uptime90d: "99.98%",
    p95Latency: "74ms",
    buildSuccess: "98.4%",
  },
  deploys: [
    { ref: "main", sha: "a4f9d12", status: "success", when: "2h ago", duration: "38s", message: "feat(home): add command palette teaser" },
    { ref: "feat/lab", sha: "7be2c01", status: "success", when: "9h ago", duration: "42s", message: "lab: add interpreter case study" },
    { ref: "main", sha: "e1c83d4", status: "success", when: "1d ago", duration: "36s", message: "chore: tune motion timings" },
    { ref: "main", sha: "f00ab12", status: "success", when: "2d ago", duration: "40s", message: "refactor(dashboard): split widgets into atoms" },
  ],
};

const githubStats = {
  topLanguages: [
    // One hue, stepped by lightness - a categorical rainbow was the look we removed.
    { name: "TypeScript", percentage: 34, color: "38 92% 58%" },
    { name: "Python", percentage: 28, color: "38 80% 48%" },
    { name: "JavaScript", percentage: 18, color: "38 70% 40%" },
    { name: "Java", percentage: 10, color: "38 60% 32%" },
    { name: "C++", percentage: 6, color: "38 50% 26%" },
    { name: "Other", percentage: 4, color: "0 0% 40%" },
  ],
};

const DEFAULT_ACCENT = "38 92% 58%";

interface NavItem {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number;
}

const NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "blog", label: "Blog", icon: FileText },
  { id: "philosophy", label: "Philosophy", icon: Atom },
  { id: "now", label: "Now", icon: Radio },
  { id: "media", label: "Media", icon: ImageIcon },
  { id: "messages", label: "Messages", icon: Mail, badge: 12 },
  { id: "lab", label: "Lab", icon: FlaskConical },
  { id: "analytics", label: "Analytics", icon: LineChart },
  { id: "deploys", label: "Deployments", icon: GitBranch },
  { id: "ai", label: "AI Assistant", icon: Bot },
  { id: "settings", label: "Settings", icon: Settings },
];

interface CmsPreviewViewProps {
  projects: Project[];
  posts: BlogPost[];
  labs: Lab[];
  principles: Principle[];
  nowItems: NowItem[];
}

export function CmsPreviewView({ projects, posts, labs, principles, nowItems }: CmsPreviewViewProps) {
  const [view, setView] = useState("overview");
  const [navOpen, setNavOpen] = useState(false);
  const activeItem = NAV.find((n) => n.id === view);

  return (
    <div className="relative">
      <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex flex-wrap items-center justify-between gap-2 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-amber-300">
              <AlertTriangle className="h-3 w-3" />
              read-only preview
            </span>
            <span className="hidden text-muted-foreground sm:inline">
              This is a concept CMS interface built as a UI showcase. All data
              shown is sample data for demonstration.
            </span>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-foreground hover:underline"
          >
            Open private dashboard <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* min-w-0 on both columns is load-bearing: grid items default to
          min-width:auto, so they refuse to shrink below their content. Without
          it the sidebar and the tables widen the grid past the viewport, the
          page scrolls sideways, and mobile browsers zoom out to compensate. */}
      <div className="container grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
        {/* Only sticky once there is a column to stick to: on narrow screens the
            sidebar sits above the content and pinning it would eat the viewport. */}
        <aside className="min-w-0 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-border bg-card/60 p-3">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <BrandMark className="h-5 w-5 shrink-0 text-signal" />
              <div className="leading-none">
                <div className="text-xs font-semibold">NIRMALYA</div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  CMS · demo
                </div>
              </div>
            </div>

            {/* Twelve sections do not fit a phone in any arrangement: stacked
                they bury the panels, in a row they overflow. Collapse them
                behind the active section until there is a sidebar. */}
            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              aria-expanded={navOpen}
              aria-controls="cms-sections"
              className="mt-3 flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-background px-2.5 py-2 text-sm lg:hidden"
            >
              <span className="flex min-w-0 items-center gap-2">
                {activeItem ? <activeItem.icon className="h-3.5 w-3.5 shrink-0" /> : null}
                <span className="truncate">{activeItem?.label}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
                <span className="font-mono text-[10px] uppercase tracking-widest">sections</span>
                {navOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </span>
            </button>

            <div
              id="cms-sections"
              className={cn("mt-3 space-y-0.5", navOpen ? "block" : "hidden lg:block")}
            >
              {NAV.map((n) => {
                const active = n.id === view;
                return (
                  <button
                    key={n.id}
                    onClick={() => {
                      setView(n.id);
                      setNavOpen(false);
                    }}
                    className={cn(
                      "group flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                      active
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <n.icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{n.label}</span>
                    </span>
                    {n.badge ? (
                      <span className="shrink-0 rounded-full bg-foreground px-1.5 py-0.5 font-mono text-[10px] text-background">
                        {n.badge}
                      </span>
                    ) : (
                      <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
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
                Editing is disabled in the public preview. Open the private
                dashboard to make changes.
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {view === "overview" && <Overview />}
          {view === "projects" && <ProjectsManager projects={projects} />}
          {view === "blog" && <BlogManager posts={posts} />}
          {view === "philosophy" && <PhilosophyManager principles={principles} />}
          {view === "now" && <NowManager items={nowItems} />}
          {view === "media" && <MediaPanel />}
          {view === "messages" && <MessagesPanel />}
          {view === "lab" && <LabPanel labs={labs} />}
          {view === "analytics" && <AnalyticsPanel />}
          {view === "deploys" && <DeploysPanel />}
          {view === "ai" && <AssistantPanel />}
          {view === "settings" && <SettingsPanel />}
        </div>
      </div>
    </div>
  );
}

function TopBar({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 pb-5">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {subtitle}
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      {actions}
    </div>
  );
}

function Panel({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card/60 p-5",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {subtitle}
          </div>
          <div className="text-sm font-semibold">{title}</div>
        </div>
        <button
          className="text-xs text-muted-foreground hover:text-foreground"
          aria-label="More"
        >
          <Filter className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="pt-4">{children}</div>
    </section>
  );
}

function Spark() {
  const points = [4, 8, 6, 12, 9, 14, 11, 16, 13, 18, 14, 22, 20, 24]
    .map((y, i) => `${i * 8},${30 - y}`)
    .join(" ");
  return (
    <svg viewBox="0 0 112 32" className="mt-3 h-8 w-full">
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--signal))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={`${points} 112,32 0,32`}
        fill="hsl(var(--signal) / 0.12)"
        stroke="none"
      />
    </svg>
  );
}

function Overview() {
  const metrics = [
    { label: "Visitors (7d)", value: "8,214", delta: "+12.4%", up: true },
    { label: "Projects", value: "12", delta: "+1", up: true },
    { label: "Posts", value: "27", delta: "+3", up: true },
    { label: "Messages", value: "184", delta: "+22", up: true },
  ];
  const topContent = [
    { t: "Kubernetes Is Not a Badge of Honor", v: 2412, type: "post" },
    { t: "DokLink - Case Study", v: 1842, type: "project" },
    {
      t: "From a Security Checklist PDF to Real Auth Code",
      v: 1238,
      type: "post",
    },
    { t: "FloatChat - Case Study", v: 1110, type: "project" },
    { t: "The Remove-It Test", v: 928, type: "post" },
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
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px]",
                  m.up
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400",
                )}
              >
                {m.delta}
              </span>
            </div>
            <div className="mt-2 text-3xl font-semibold tabular-nums">
              {m.value}
            </div>
            <Spark />
          </motion.div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <Panel
          title="Live system status"
          subtitle="production"
          className="lg:col-span-2"
        >
          <ul className="divide-y divide-border">
            {systemStatus.services.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between py-2.5 text-sm"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                  {s.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ["Uptime 90d", systemStatus.metrics.uptime90d],
              ["P95", systemStatus.metrics.p95Latency],
              ["Build success", systemStatus.metrics.buildSuccess],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-xl border border-border bg-background p-3"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {k}
                </div>
                <div className="text-sm font-semibold tabular-nums">{v}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent deploys" subtitle="vercel">
          <ul className="space-y-2">
            {systemStatus.deploys.map((d) => (
              <li
                key={d.sha}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
              >
                <span className="mt-1 grid h-6 w-6 place-items-center rounded-md border border-border bg-card">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {d.ref} · {d.sha}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {d.duration}
                    </span>
                  </div>
                  <div className="truncate text-sm">{d.message}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {d.when}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <Panel title="Top content" subtitle="7d" className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {topContent.map((row, i) => (
              <li
                key={row.t}
                className="flex items-center gap-3 py-2.5 text-sm"
              >
                <span className="w-5 text-right font-mono text-[11px] text-muted-foreground">
                  {i + 1}
                </span>
                <span className="flex-1 truncate">{row.t}</span>
                <span className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {row.type}
                </span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {row.v.toLocaleString()}
                </span>
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

function ProjectsManager({ projects }: { projects: Project[] }) {
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
      {/* overflow-x-auto, not overflow-hidden: hidden clipped the right-hand
          columns on narrow screens with no way to reach them. */}
      <div className="scrollbar-thin overflow-x-auto rounded-2xl border border-border bg-card/60">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border bg-background/40 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr
                key={p.id}
                className="border-b border-border last:border-none hover:bg-foreground/3"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: `hsl(${DEFAULT_ACCENT})`,
                      }}
                    />
                    <span className="font-medium">{p.title}</span>
                    {p.featured && (
                      <Badge
                        variant="secondary"
                        className="rounded-md bg-secondary/50 font-mono text-[9px] uppercase text-muted-foreground"
                      >
                        featured
                      </Badge>
                    )}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-muted-foreground">
                    /projects/{p.slug}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {p.category}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 tabular-nums">{p.year}</td>
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

function BlogManager({ posts }: { posts: BlogPost[] }) {
  const post = posts[0];
  if (!post)
    return <div className="text-sm text-muted-foreground">No posts yet.</div>;
  return (
    <div>
      <TopBar
        title="Markdown editor"
        subtitle="blog · draft preview"
        actions={
          <div className="flex items-center gap-2">
            <button className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card/60 px-4 text-xs text-muted-foreground opacity-60">
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs text-background opacity-60">
              <Save className="h-3.5 w-3.5" /> Save draft
            </button>
          </div>
        }
      />
      <div className="grid gap-3 lg:grid-cols-2">
        <Panel title="Editor" subtitle="markdown · mdx">
          <pre className="scrollbar-thin h-105 overflow-auto rounded-xl border border-border bg-background p-4 font-mono text-[12px] leading-relaxed text-foreground/90">
            {`# ${post.title}\n\n> ${post.excerpt}\n\n## Background\n\n${post.body}\n\n\`\`\`bash\n# example install\nnpx create-next-app neural-cmd --typescript\n\`\`\`\n`}
          </pre>
        </Panel>
        <Panel title="Live preview" subtitle="rendered">
          <article className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold tracking-tight">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            <hr className="my-4 border-border" />
            <h3 className="text-base font-semibold">Background</h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
              {post.body}
            </p>
          </article>
        </Panel>
      </div>
    </div>
  );
}

function PhilosophyManager({ principles }: { principles: Principle[] }) {
  return (
    <div>
      <TopBar
        title="Philosophy"
        subtitle={`${principles.length} principles · ordered`}
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-background opacity-60">
            <Plus className="h-3.5 w-3.5" /> New principle
          </button>
        }
      />
      <div className="space-y-2">
        {principles.map((p) => (
          <div
            key={p.id}
            className="group flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-4 transition-colors hover:border-foreground/20"
          >
            <span className="mt-0.5 text-muted-foreground/50" aria-hidden>
              <GripVertical className="h-4 w-4" />
            </span>
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-border bg-background font-mono text-[10px] tabular-nums text-muted-foreground">
              {String(p.order).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-semibold">{p.title}</h3>
                <span className="font-mono text-[10px] text-muted-foreground/60">/{p.slug}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
            <button
              disabled
              aria-label={`Edit ${p.title}`}
              className="shrink-0 rounded-md border border-border bg-background p-1.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-60"
            >
              <Save className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const NOW_GROUPS: { key: NowCategory; label: string }[] = [
  { key: "building", label: "Building" },
  { key: "learning", label: "Learning" },
  { key: "experimenting", label: "Experimenting" },
  { key: "stack", label: "Stack" },
  { key: "goal", label: "Goal" },
];

function NowManager({ items }: { items: NowItem[] }) {
  return (
    <div>
      <TopBar
        title="Now"
        subtitle={`${items.length} items · ${NOW_GROUPS.length} sections`}
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs font-medium text-background opacity-60">
            <Plus className="h-3.5 w-3.5" /> New item
          </button>
        }
      />
      <div className="grid gap-3 md:grid-cols-2">
        {NOW_GROUPS.map((g) => {
          const groupItems = items.filter((i) => i.category === g.key);
          return (
            <div key={g.key} className="rounded-2xl border border-border bg-card/60 p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {g.label}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                  {groupItems.length}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {groupItems.map((it) => (
                  <li
                    key={it.id}
                    className="group flex items-start gap-2 rounded-lg border border-border bg-background px-3 py-2"
                  >
                    <span className="mt-0.5 font-mono text-[10px] tabular-nums text-muted-foreground/60">
                      {String(it.order).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 text-xs leading-relaxed text-foreground/90">{it.body}</span>
                    <button
                      disabled
                      aria-label={`Edit ${it.slug}`}
                      className="shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-60"
                    >
                      <Save className="h-3 w-3" />
                    </button>
                  </li>
                ))}
                {groupItems.length === 0 && (
                  <li className="rounded-lg border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
                    No items yet.
                  </li>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MediaPanel() {
  return (
    <div>
      <TopBar
        title="Media library"
        subtitle="uploads · r2"
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-xs text-background opacity-60">
            <Upload className="h-3.5 w-3.5" /> Upload
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-card/60"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(80% 80% at ${20 + i * 8}% ${30 + i * 5}%, hsl(${
                  ["199 89% 74%", "213 94% 78%", "250 91% 85%", "30 80% 65%"][
                    i % 4
                  ]
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
  // Fictional sample messages for the concept demo.
  const samples = [
    {
      name: "Sample: Recruiter",
      email: "recruiter@example.org",
      subject: "Full stack role",
      preview: "Hi Nirmalya - came across your portfolio and…",
      when: "2h",
      unread: true,
    },
    {
      name: "Sample: Founder",
      email: "founder@example.org",
      subject: "Freelance project inquiry",
      preview: "We need a web + mobile build for our…",
      when: "8h",
      unread: true,
    },
    {
      name: "Sample: Developer",
      email: "dev@example.org",
      subject: "Question about FloatChat",
      preview: "Read your case study - how did you validate the SQL…",
      when: "1d",
      unread: false,
    },
    {
      name: "Sample: Student",
      email: "student@example.org",
      subject: "Advice on interpreters",
      preview: "Saw the CONTEXT lab entry. Where should I start…",
      when: "2d",
      unread: false,
    },
  ];
  return (
    <div>
      <TopBar
        title="Messages"
        subtitle={`${samples.filter((s) => s.unread).length} unread`}
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card/60">
        <ul className="divide-y divide-border">
          {samples.map((m, i) => (
            <li
              key={i}
              className="flex items-start gap-3 px-5 py-4 hover:bg-foreground/3"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-xs font-semibold">
                {m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate text-sm font-medium">
                      {m.name}
                    </span>
                    {m.unread && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--signal))]" />
                    )}
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {m.when}
                  </span>
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {m.email} · {m.subject}
                </div>
                <p className="mt-1 truncate text-sm text-foreground/80">
                  {m.preview}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LabPanel({ labs }: { labs: Lab[] }) {
  return (
    <div>
      <TopBar title="Lab experiments" subtitle={`${labs.length} total`} />
      <div className="grid gap-3 md:grid-cols-2">
        {labs.map((l) => (
          <div
            key={l.id}
            className="rounded-2xl border border-border bg-card/60 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {l.status}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                {l.progress}%
              </span>
            </div>
            <h3 className="mt-2 text-base font-semibold">{l.title}</h3>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {l.description}
            </p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-[hsl(var(--signal))]"
                style={{ width: `${l.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const buckets = [
    12, 14, 9, 16, 22, 19, 14, 18, 24, 28, 22, 18, 26, 32, 28, 30, 27, 22, 18,
    14, 11, 9, 12, 8,
  ];
  const max = Math.max(...buckets);
  return (
    <div>
      <TopBar title="Analytics" subtitle="site · last 24h" />
      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Pageviews" subtitle="hourly">
          <div className="flex h-55 items-end gap-1">
            {buckets.map((b, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md"
                style={{
                  height: `${(b / max) * 100}%`,
                  background:
                    "linear-gradient(to top, hsl(var(--signal) / 0.15), hsl(var(--signal) / 0.6))",
                }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </Panel>
        <Panel title="Top languages" subtitle="github">
          <ul className="space-y-3">
            {githubStats.topLanguages.map((l) => (
              <li key={l.name}>
                <div className="flex justify-between text-xs">
                  <span>{l.name}</span>
                  <span className="font-mono tabular-nums text-muted-foreground">
                    {l.percentage}%
                  </span>
                </div>
                <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${l.percentage}%`,
                      background: `hsl(${l.color})`,
                    }}
                  />
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
      <div className="scrollbar-thin overflow-x-auto rounded-2xl border border-border bg-card/60">
        <table className="w-full min-w-[680px] text-sm">
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
            {systemStatus.deploys.map((d) => (
              <tr
                key={d.sha}
                className="border-b border-border last:border-none"
              >
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-emerald-300">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  {d.ref} · {d.sha}
                </td>
                <td className="px-4 py-3">{d.message}</td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums">
                  {d.duration}
                </td>
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

function AssistantMini({ big = false }: { big?: boolean }) {
  return (
    <div>
      <div
        className={cn(
          "space-y-2 overflow-auto pr-1 scrollbar-thin",
          big ? "max-h-105" : "max-h-45",
        )}
      >
        <Bubble role="user">What&apos;s the architecture of FloatChat?</Bubble>
        <Bubble role="ai">
          FloatChat is a Next.js frontend over a FastAPI backend. LangChain
          orchestrates Mistral 7B for natural language to SQL, and Supabase
          provides PostgreSQL plus vector storage for retrieval.
        </Bubble>
        <Bubble role="user">Compare it to DokLink.</Bubble>
        <Bubble role="ai">
          DokLink is a React Native app on a Django REST backend - a
          transactional system where correctness under concurrency matters
          most, while FloatChat is read-heavy analytics over a static dataset.
        </Bubble>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background pr-1 pl-3">
        <Wand2 className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          placeholder="Ask the AI assistant… (preview)"
          disabled
          className="h-9 flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        <button aria-label="Send message" className="inline-grid h-7 w-7 place-items-center rounded-full bg-foreground text-background opacity-60">
          <Send className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "ai" | "user";
  children: ReactNode;
}) {
  const isAi = role === "ai";
  return (
    <div className={cn("flex", isAi ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
          isAi
            ? "bg-card/80 border border-border text-foreground/90"
            : "bg-foreground text-background",
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
          <Setting k="GitHub" v="@DevNiru2704" ok />
          <Setting k="Supabase" v="production" ok />
          <Setting k="Resend" v="contact email" ok />
        </Panel>
        <Panel title="SEO" subtitle="meta">
          <Setting k="Title template" v="%s · NIRMALYA" />
          <Setting k="OG image" v="/og.png" />
          <Setting k="Sitemap" v="/sitemap.xml" />
        </Panel>
        <Panel title="Analytics" subtitle="events">
          <Setting k="Vercel Analytics" v="enabled" ok />
          <Setting k="Domain" v="devniru.in" ok />
          <Setting k="Sitemap ping" v="on deploy" ok />
        </Panel>
      </div>
    </div>
  );
}

function Setting({ k, v, ok }: { k: string; v: string; ok?: boolean }) {
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
