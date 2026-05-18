'use client';

import { motion } from 'framer-motion';
import { GitBranch, PlayCircle, Cloud, Database, Globe2, BarChart3 } from 'lucide-react';

const stages = [
  { icon: GitBranch, label: 'GitHub', sub: 'push · main' },
  { icon: PlayCircle, label: 'GitHub Actions', sub: 'build · test · lint' },
  { icon: Cloud, label: 'Vercel', sub: 'edge · streaming' },
  { icon: Database, label: 'Supabase', sub: 'postgres · realtime' },
  { icon: Globe2, label: 'Edge Network', sub: 'cdn · 32 regions' },
  { icon: BarChart3, label: 'Analytics', sub: 'rum · logs' },
];

export function DeploymentPipeline() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          deployment pipeline
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">flow → main · a4f9d12</div>
      </div>
      <div className="relative px-5 py-8">
        <div className="pointer-events-none absolute inset-x-5 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="relative grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-3 lg:grid-cols-6">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative grid h-12 w-12 place-items-center rounded-xl border border-border bg-background">
                <s.icon className="h-5 w-5 text-foreground" />
                <motion.span
                  className="absolute inset-0 rounded-xl border border-[hsl(var(--glow-cyan)/0.5)]"
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2.4, delay: i * 0.3, repeat: Infinity }}
                />
              </div>
              <div className="mt-2.5 text-xs font-semibold">{s.label}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{s.sub}</div>
            </motion.div>
          ))}
        </div>
        {/* Moving pulse */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[hsl(var(--glow-cyan))]"
          style={{ boxShadow: '0 0 16px hsl(var(--glow-cyan) / 0.9)' }}
          animate={{ left: ['0%', '100%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
