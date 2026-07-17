"use client";

import { Fragment, useEffect, useState } from "react";
import { Bold } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "prefetch-reading";

/**
 * Prefetch mode bolds the opening letters of each word. The eye lands on the
 * bold part and the brain completes the rest before you finish looking, so
 * readers who lose their place in flat text (common with ADHD and dyslexia) get
 * an anchor on every word.
 *
 * The name is ours: the underlying technique is widely known under a trademarked
 * brand we deliberately do not use.
 *
 * Roughly 40% of each word is bolded, always at least one letter. Leading
 * punctuation stays unbolded so quotes and brackets do not eat the fixation.
 *
 * The character classes are spelled out rather than using \p{L}, which needs an
 * ES2018 target; tokens are already whitespace-free so no dotAll flag is needed.
 */
const WORD = /^([^A-Za-z0-9À-ÖØ-öø-ÿ]*)([A-Za-z0-9À-ÖØ-öø-ÿ'’-]+)(.*)$/;

function fixate(token: string): { pre: string; bold: string; rest: string } | null {
  const match = token.match(WORD);
  if (!match) return null;
  const [, pre, word, post] = match;
  const boldLength = Math.max(1, Math.ceil(word.length * 0.4));
  return { pre, bold: word.slice(0, boldLength), rest: word.slice(boldLength) + post };
}

function PrefetchText({ text }: { text: string }) {
  // Keep the separators so spacing survives the split.
  return (
    <>
      {text.split(/(\s+)/).map((token, i) => {
        if (!token || /^\s+$/.test(token)) return <Fragment key={i}>{token}</Fragment>;
        const parts = fixate(token);
        if (!parts) return <Fragment key={i}>{token}</Fragment>;
        return (
          <Fragment key={i}>
            {parts.pre}
            <b className="font-bold text-foreground">{parts.bold}</b>
            {parts.rest}
          </Fragment>
        );
      })}
    </>
  );
}

export function ArticleBody({ body }: { body: string }) {
  const [prefetch, setPrefetch] = useState(false);

  // Read after mount: localStorage is not available while rendering on the
  // server, and seeding state from it directly would mismatch on hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefetch(window.localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const toggle = () => {
    setPrefetch((previous) => {
      const next = !previous;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const paragraphs = body.split(/\n\n+/);

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-border bg-card/60 px-4 py-3">
        <label htmlFor="prefetch-toggle" className="flex cursor-pointer items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background">
            <Bold className={cn("h-4 w-4 transition-colors", prefetch ? "text-[hsl(var(--signal))]" : "text-muted-foreground")} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-medium">Prefetch</span>
            <span className="text-xs text-muted-foreground">
              Anchors your eye to the start of each word. Built for ADHD and dyslexic readers.
            </span>
          </span>
        </label>
        <button
          id="prefetch-toggle"
          type="button"
          role="switch"
          aria-checked={prefetch}
          onClick={toggle}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors",
            prefetch ? "border-transparent bg-[hsl(var(--signal))]" : "border-border bg-secondary",
          )}
        >
          <span className="sr-only">Toggle prefetch reading mode</span>
          <span
            className={cn(
              "inline-block h-4 w-4 rounded-full bg-background shadow transition-transform",
              prefetch ? "translate-x-6" : "translate-x-1",
            )}
          />
        </button>
      </div>

      {paragraphs.map((paragraph, i) => (
        <p key={i} className="mb-5 text-balance leading-relaxed text-foreground/90">
          {prefetch ? <PrefetchText text={paragraph.trim()} /> : paragraph.trim()}
        </p>
      ))}
    </>
  );
}
