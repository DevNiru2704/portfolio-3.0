import type { Metadata } from "next";
import { principleRepository } from "@/repositories/principle-repository";
import { GridBg } from "@/components/site/grid-bg";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata: Metadata = {
  title: "Philosophy",
  description: "The engineering principles I build by.",
};

// Principles are sourced from Postgres at request time.
export const dynamic = "force-dynamic";

export default async function PhilosophyPage() {
  const principles = await principleRepository.findAll();

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative py-16">
          <SectionHeading
            eyebrow="Philosophy"
            title="The principles I engineer by."
            description="Tools and frameworks change. These don't."
          />
        </div>
      </section>

      <section className="container py-12">
        <ol className="grid gap-4 md:grid-cols-2">
          {principles.map((p, i) => (
            <li key={p.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  principle · 0{i + 1}
                </div>
                <span className="font-mono text-xs text-muted-foreground/50 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-signal">{p.title}</h3>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-foreground/90">{p.body}</p>
              <span className="pointer-events-none absolute -right-10 -top-10 text-7xl font-bold text-muted/30">{i + 1}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
