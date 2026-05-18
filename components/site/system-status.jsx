'use client';

import { motion } from 'framer-motion';
import { Activity, GitCommit, Server, Database, Cloud } from 'lucide-react';
import { seedSystemStatus } from '@/config/seed';

const icons = { Portfolio: Activity, API: Server, Database, 'Edge Network': Cloud };

export function SystemStatusPanel({ compact = false }) {
  const { services, metrics } = seedSystemStatus;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 animate-pulse-dot rounded-full bg-emerald-400" />
            <span className="absolute inset-0 rounded-full bg-emerald-400/60" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            live system status
          </span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">last sync · just now</span>
      </div>

      <div className="divide-y divide-border">
        {services.map((s, i) => {
          const Icon = icons[s.name] || Activity;
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-md border border-border bg-background">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </span>
                <span className="text-sm">{s.name}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                <span className="text-muted-foreground">{s.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {!compact && (
        <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
          <Metric label="Last Deploy" value={metrics.lastDeploy} />
          <Metric label="P95 Latency" value={metrics.p95Latency} />
          <Metric label="Uptime 90d" value={metrics.uptime90d} />
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="px-4 py-3">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold tabular-nums">{value}</div>
    </div>
  );
}
