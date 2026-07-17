"use client";

import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

const DEFAULT_ACCENT = "199 89% 74%";

export function ProjectCard({ project, index = 0, featured = false }: ProjectCardProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const accent = project.accent ?? DEFAULT_ACCENT;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const bg = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, hsl(${accent} / 0.18), transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-6 transition-all",
          "hover:-translate-y-0.5 hover:border-foreground/20",
          featured && "lg:p-8",
        )}
      >
        <motion.div
          aria-hidden
          style={{ background: bg }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-grid-sm opacity-[0.05]" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: `hsl(${accent})`, boxShadow: `0 0 12px hsl(${accent} / 0.7)` }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {project.category}
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">{project.year}</span>
        </div>

        <h3 className={cn("relative mt-4 text-2xl font-semibold tracking-tight", featured && "md:text-3xl")}>
          {project.title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{project.description}</p>

        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-md bg-secondary/50 font-mono text-[10px] font-normal text-muted-foreground"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* No stars/forks/watchers row: the real counts are 0-6, so it only ever
            advertised zeros. Projects stand on their case studies. */}
        <div className="relative mt-6 flex flex-1 items-end justify-end">
          <div className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
