"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { GridBg } from "@/components/site/grid-bg";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type SortKey = "Recent" | "Stars";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const allTags = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.tags))).sort(), [projects]);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("Recent");

  const filtered = useMemo(() => {
    let list = projects.filter((p) => cat === "All" || p.category === cat);
    if (tag) list = list.filter((p) => p.tags.includes(tag));
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.tags.some((t) => t.toLowerCase().includes(s)),
      );
    }
    if (sort === "Stars") list = [...list].sort((a, b) => (b.metrics?.stars ?? 0) - (a.metrics?.stars ?? 0));
    if (sort === "Recent") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [projects, cat, q, tag, sort]);

  return (
    <div className="relative">
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative py-16">
          <SectionHeading
            eyebrow="Projects"
            title="Engineered systems, end to end."
            description="Every project is shipped, instrumented, and accountable. Pick one to see the architecture, tradeoffs and metrics."
          />
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects…"
                className="h-10 w-72 rounded-full border border-border bg-card/60 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    cat === c
                      ? "border-foreground/30 bg-card text-foreground"
                      : "border-border bg-card/40 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">sort</span>
              {(["Recent", "Stars"] as SortKey[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition-colors",
                    sort === s
                      ? "border-foreground/30 bg-card text-foreground"
                      : "border-border bg-card/40 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">tags</span>
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(tag === t ? null : t)}
                className={cn(
                  "rounded-md border px-2 py-0.5 font-mono text-[10px] transition-colors",
                  tag === t
                    ? "border-foreground/30 bg-foreground text-background"
                    : "border-border bg-card/40 text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
            {tag && (
              <button
                onClick={() => setTag(null)}
                className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" /> clear
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>
            {filtered.length} project{filtered.length === 1 ? "" : "s"} · filtered
          </span>
          <span>page · /projects</span>
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={cat + q + tag + sort}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center text-sm text-muted-foreground">
            No projects match those filters. Try clearing them.
          </div>
        )}
      </section>
    </div>
  );
}
