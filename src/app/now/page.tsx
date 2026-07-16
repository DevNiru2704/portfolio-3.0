import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Rocket, BookOpen, FlaskConical, Target, Layers } from "lucide-react";
import { now } from "@/config/content";
import { GridBg } from "@/components/site/grid-bg";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Now",
  description: "A snapshot of what I'm building, learning and experimenting with this quarter.",
};

interface NowSection {
  key: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  items: string[];
}

const sections: NowSection[] = [
  { key: "building", title: "Currently building", icon: Rocket, items: now.building },
  { key: "learning", title: "Currently learning", icon: BookOpen, items: now.learning },
  { key: "experimenting", title: "Currently experimenting", icon: FlaskConical, items: now.experimenting },
];

export default function NowPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative py-16">
          <SectionHeading
            eyebrow={`/now · ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
            title="What I'm focused on right now."
            description="A snapshot of the current quarter. Updated when the focus actually shifts - not for show."
          />
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {sections.map((s) => (
            <div key={s.key} className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background">
                  <s.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">section</div>
                  <div className="text-sm font-semibold">{s.title}</div>
                </div>
              </div>
              <ul className="mt-5 space-y-3">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 rounded-lg border border-border bg-background p-3 text-sm">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--glow-cyan))]" />
                    <span className="text-foreground/90">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background">
                <Layers className="h-4 w-4" />
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  current stack obsessions
                </div>
                <div className="text-sm font-semibold">In active rotation</div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {now.stack.map((s) => (
                <span key={s} className="rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background">
                <Target className="h-4 w-4" />
              </span>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">current goal</div>
                <div className="text-sm font-semibold">Single-objective focus</div>
              </div>
            </div>
            <p className="mt-4 text-lg font-medium text-gradient">{now.goal}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
