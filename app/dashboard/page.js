'use client';

import Link from 'next/link';
import { Lock, KeyRound, Sparkles, ArrowUpRight } from 'lucide-react';
import { GridBg } from '@/components/site/grid-bg';

function Page() {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <GridBg />
        <div className="container relative grid min-h-[70vh] place-items-center py-16">
          <div className="max-w-xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Lock className="h-3 w-3" /> Protected route
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              <span className="text-gradient">Dashboard</span> <span className="text-gradient-accent">requires auth.</span>
            </h1>
            <p className="mt-4 text-balance text-muted-foreground">
              This is the real CMS — protected by Clerk in production. While running locally without auth keys, the public, read-only preview lives at <Link className="text-foreground underline" href="/cms-preview">/cms-preview</Link>.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="/cms-preview"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background"
              >
                <Sparkles className="h-4 w-4" /> Open CMS Preview
              </Link>
              <button
                disabled
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card/60 px-5 text-sm font-medium opacity-60"
              >
                <KeyRound className="h-4 w-4" /> Sign in (disabled in demo)
              </button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 text-left">
              {[
                { k: 'Auth provider', v: 'Clerk' },
                { k: 'DB', v: 'MongoDB / Supabase' },
                { k: 'Edge', v: 'Vercel + RUM' },
              ].map((r) => (
                <div key={r.k} className="rounded-xl border border-border bg-card/60 p-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{r.k}</div>
                  <div className="mt-1 text-sm">{r.v}</div>
                </div>
              ))}
            </div>
            <Link
              href="/cms-preview"
              className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Or browse the public preview <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Page;
