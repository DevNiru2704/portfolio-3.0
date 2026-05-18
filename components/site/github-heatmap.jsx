'use client';

import { useMemo } from 'react';
import { seedGitHubStats } from '@/config/seed';
import { GitCommit, Star, GitPullRequest, Users } from 'lucide-react';

// Deterministic pseudo-random based on x*31+y
function value(x, y) {
  const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

export function GitHubHeatmap() {
  const weeks = 52;
  const days = 7;
  const grid = useMemo(() => {
    const arr = [];
    for (let w = 0; w < weeks; w++) {
      const col = [];
      for (let d = 0; d < days; d++) {
        const r = value(w + 1, d + 1);
        // Add a weekly trend so it doesn't feel uniform
        const trend = 0.4 + 0.6 * Math.abs(Math.sin(w / 7));
        const v = r * trend;
        let level = 0;
        if (v > 0.78) level = 4;
        else if (v > 0.6) level = 3;
        else if (v > 0.42) level = 2;
        else if (v > 0.22) level = 1;
        col.push(level);
      }
      arr.push(col);
    }
    return arr;
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            github activity · @{seedGitHubStats.username}
          </div>
          <div className="mt-0.5 text-sm font-semibold">
            {seedGitHubStats.totalCommits.toLocaleString()} commits in the last year
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <Stat icon={Star} value={seedGitHubStats.totalStars} label="stars" />
          <Stat icon={GitPullRequest} value={seedGitHubStats.totalPRs} label="PRs" />
          <Stat icon={Users} value={seedGitHubStats.followers} label="followers" />
          <Stat icon={GitCommit} value={seedGitHubStats.publicRepos} label="repos" />
        </div>
      </div>

      <div className="flex gap-4 px-5 py-5">
        <div className="hidden flex-col justify-between py-1 pr-1 text-[10px] text-muted-foreground sm:flex">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="scrollbar-thin overflow-x-auto">
          <div className="flex gap-[3px]">
            {grid.map((col, w) => (
              <div key={w} className="flex flex-col gap-[3px]">
                {col.map((lv, d) => (
                  <div
                    key={d}
                    title={`week ${w + 1}, day ${d + 1}`}
                    className="h-2.5 w-2.5 rounded-[2px] transition-colors"
                    style={{
                      background:
                        lv === 0
                          ? 'hsl(var(--surface-3) / 0.6)'
                          : `hsl(var(--glow-cyan) / ${0.18 + lv * 0.18})`,
                      boxShadow: lv >= 3 ? `0 0 6px hsl(var(--glow-cyan) / 0.35)` : 'none',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>Jul</span><span>Sep</span><span>Nov</span><span>Jan</span><span>Mar</span><span>May</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3">
        <div className="flex flex-wrap gap-3">
          {seedGitHubStats.topLanguages.map((l) => (
            <div key={l.name} className="flex items-center gap-1.5 text-xs">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: `hsl(${l.color})` }}
              />
              <span className="text-muted-foreground">{l.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground/70">{l.percentage}%</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span>less</span>
          {[0, 1, 2, 3, 4].map((lv) => (
            <span
              key={lv}
              className="h-2.5 w-2.5 rounded-[2px]"
              style={{
                background:
                  lv === 0 ? 'hsl(var(--surface-3) / 0.6)' : `hsl(var(--glow-cyan) / ${0.18 + lv * 0.18})`,
              }}
            />
          ))}
          <span>more</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5" />
      <span className="tabular-nums text-foreground">{value.toLocaleString()}</span>
      <span>{label}</span>
    </span>
  );
}
