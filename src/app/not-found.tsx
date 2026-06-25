import Link from "next/link";
import { Home } from "lucide-react";
import { GridBg } from "@/components/site/grid-bg";

export default function NotFound() {
  return (
    <div className="relative isolate">
      <GridBg />
      <div className="container relative grid min-h-[70vh] place-items-center text-center">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">error · 404</div>
          <h1 className="mt-3 text-6xl font-semibold tracking-tight md:text-8xl">
            <span className="text-gradient">Not</span> <span className="text-gradient-accent">found.</span>
          </h1>
          <p className="mt-3 max-w-md text-balance text-muted-foreground">
            The page you tried to access doesn&apos;t exist. The system has not allocated a route for it.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background"
          >
            <Home className="h-4 w-4" /> Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
