"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container grid min-h-[70vh] place-items-center text-center">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">error · 500</div>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
          <span className="text-gradient">Something</span> <span className="text-gradient-accent">broke.</span>
        </h1>
        <p className="mt-3 max-w-md text-balance text-muted-foreground">
          An unexpected error occurred while rendering this page. You can retry or head back home.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background"
          >
            <RotateCcw className="h-4 w-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/60 px-5 text-sm"
          >
            <Home className="h-4 w-4" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
