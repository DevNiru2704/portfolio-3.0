"use client";

import { motion } from "framer-motion";
import { GitMerge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Lab } from "@/types/content";

export function LabGrid({ labs }: { labs: Lab[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {labs.map((lab, i) => (
        <motion.div
          key={lab.id}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.05 }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-foreground/20"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${lab.status === "Done" ? "bg-emerald-400" : "bg-amber-400 animate-pulse-dot"}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{lab.status}</span>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">#{i + 1}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight">{lab.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lab.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {lab.tags.map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="rounded-md bg-secondary/50 font-mono text-[10px] font-normal text-muted-foreground"
              >
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span>progress</span>
              <span className="tabular-nums">{lab.progress}%</span>
            </div>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lab.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-[hsl(var(--signal))]"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-12 -top-12 opacity-[0.05] transition-opacity group-hover:opacity-[0.12]">
            <GitMerge className="h-36 w-36" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
