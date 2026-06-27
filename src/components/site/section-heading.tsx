import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description, align = "left", children }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10 flex flex-col gap-3", align === "center" && "items-center text-center")}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-[hsl(var(--glow-cyan))]" />
          {eyebrow}
        </div>
      ) : null}
      {title ? (
        <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          <span className="text-gradient">{title}</span>
        </h2>
      ) : null}
      {description ? <p className="max-w-2xl text-balance text-muted-foreground">{description}</p> : null}
      {children}
    </div>
  );
}
