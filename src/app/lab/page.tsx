import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { labRepository } from "@/repositories/lab-repository";
import { SectionHeading } from "@/components/site/section-heading";
import { GridBg } from "@/components/site/grid-bg";
import { LabGrid } from "@/components/site/lab-grid";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experimental prototypes, shaders, CLI tools and infrastructure experiments.",
};

export const dynamic = "force-dynamic";

export default async function LabPage() {
  const labs = await labRepository.findAll();
  const inProgress = labs.filter((l) => l.status === "In Progress").length;

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <GridBg />
        <div className="container relative py-16">
          <SectionHeading
            eyebrow="Lab"
            title="Experimental engineering playground."
            description="Half-finished prototypes, shaders, CLI tools, infra experiments. The unfiltered work that doesn't belong on the project page — yet."
          />
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
              <FlaskConical className="h-3.5 w-3.5 text-[hsl(var(--glow-cyan))]" />
              {labs.length} experiments
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{inProgress} in progress</span>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <LabGrid labs={labs} />
      </section>
    </div>
  );
}
