'use client';

import { motion } from 'framer-motion';
import { FlaskConical, ChevronRight, GitMerge } from 'lucide-react';
import { seedLab } from '@/config/seed';
import { SectionHeading } from '@/components/site/section-heading';
import { GridBg } from '@/components/site/grid-bg';
import { Badge } from '@/components/ui/badge';

function LabPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative py-16">
          <SectionHeading
            eyebrow="Lab"
            title="Experimental engineering playground."
            description="Half-finished prototypes, shaders, CLI tools, infra experiments. The unfiltered work that doesn’t belong on the project page — yet."
          />
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
              <FlaskConical className="h-3.5 w-3.5 text-[hsl(var(--glow-cyan))]" />
              {seedLab.length} experiments
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              {seedLab.filter((l) => l.status === 'In Progress').length} in progress
            </span>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {seedLab.map((lab, i) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      lab.status === 'Done' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse-dot'
                    }`}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {lab.status}
                  </span>
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
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-[hsl(var(--glow-cyan))]"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute -right-12 -top-12 opacity-[0.05] transition-opacity group-hover:opacity-[0.12]">
                <GitMerge className="h-36 w-36" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  return <LabPage />;
}
export default App;
