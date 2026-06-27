"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { stack } from "@/config/content";

const layerAccents: Record<string, string> = {
  Frontend: "199 89% 74%",
  Backend: "213 94% 78%",
  DevOps: "160 60% 55%",
  "AI/ML": "250 91% 85%",
  Tools: "30 80% 65%",
};

const DEFAULT_ACCENT = "199 89% 74%";

export function StackOrbit() {
  const layers = Object.keys(stack);
  const [active, setActive] = useState(layers[0]);
  const items = stack[active];
  const accent = layerAccents[active] ?? DEFAULT_ACCENT;
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Read the user's motion preference once on mount (not available during SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      {/* Orbit */}
      <div className="relative mx-auto aspect-square w-full max-w-105">
        {[1, 2, 3].map((ring) => (
          <div key={ring} className="absolute rounded-full border border-border" style={{ inset: `${ring * 12}%` }} />
        ))}
        <motion.div
          className="absolute inset-[12%] rounded-full border-conic"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        />
        {/* Core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="relative grid h-24 w-24 place-items-center rounded-full border border-border bg-card text-center text-xs font-semibold"
            style={{
              boxShadow: `0 0 40px -8px hsl(${accent} / 0.6), inset 0 0 24px -10px hsl(${accent} / 0.45)`,
            }}
          >
            <span className="text-gradient-accent">{active}</span>
            <span
              className="pointer-events-none absolute inset-0 animate-spin-slow rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent, hsl(${accent} / 0.35), transparent 70%)`,
                mask: "radial-gradient(transparent 56%, #000 58%)",
                WebkitMask: "radial-gradient(transparent 56%, #000 58%)",
              }}
            />
          </div>
        </div>
        {/* Dots */}
        {items.map((it, i) => {
          const angle = (i / items.length) * Math.PI * 2;
          const r = 38;
          // Round so the server string matches what the browser reparses (avoids hydration mismatch).
          const x = (50 + Math.cos(angle) * r).toFixed(4);
          const y = (50 + Math.sin(angle) * r).toFixed(4);
          return (
            <div key={it} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <div className="group relative">
                <div
                  className="h-2.5 w-2.5 rounded-full border border-border bg-card"
                  style={{ boxShadow: `0 0 12px hsl(${accent} / 0.7)` }}
                />
                <div className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                  {it}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side panel */}
      <div>
        <div className="flex flex-wrap gap-2">
          {layers.map((l) => (
            <button
              key={l}
              onClick={() => setActive(l)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active === l
                  ? "border-foreground/30 bg-card text-foreground"
                  : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-border bg-card/60 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {active} · {items.length} primary tools
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
            {items.map((it) => (
              <li key={it} className="flex items-center gap-2 text-sm">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: `hsl(${accent})` }} />
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
