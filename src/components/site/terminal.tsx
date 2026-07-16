"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const PROMPT = "nirmalya@neural ~ $";

const COMMANDS: Record<string, string[]> = {
  whoami: ["nirmalya mandal - full stack developer · web + mobile · cto @ doklink services"],
  skills: ["typescript · python · java · react · next.js · react native · django · fastapi · postgresql · docker"],
  projects: [
    "[1] DokLink   - emergency healthcare platform (react native + django, play store)",
    "[2] FloatChat - AI conversational analytics for argo ocean data",
    "[3] AUKTAVE   - university fest portal (next.js 16, pwa)",
  ],
  stack: [
    "frontend: next.js · react · react native · tailwind",
    "backend:  django  · drf · fastapi · node.js · express",
    "data:     postgresql · mongodb · mysql · redis",
    "devops:   docker  · nginx · linux · ci/cd",
  ],
  status: [
    "● open to full-time roles and freelance work",
    "● location: kolkata, india (IST UTC+5:30)",
    "● currently: cto @ doklink services",
  ],
  contact: ["email:  nirmalya.mandal@outlook.com", "github: github.com/DevNiru2704"],
  help: [
    "Available commands:",
    "  whoami    - about me",
    "  skills    - tech I work with",
    "  projects  - featured work",
    "  stack     - tools by layer",
    "  status    - availability",
    "  contact   - how to reach me",
    "  clear     - reset terminal",
    "  help      - this list",
  ],
  clear: [],
};

const KNOWN = Object.keys(COMMANDS);

type LineKind = "sys" | "in" | "out" | "err";
interface TermLine {
  kind: LineKind;
  text: string;
}

export function Terminal() {
  const [lines, setLines] = useState<TermLine[]>([
    { kind: "sys", text: "neural command interface · v1.0.0" },
    { kind: "sys", text: "type “help” to begin. arrow keys for history. tab to autocomplete." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.scrollTop = wrapRef.current.scrollHeight;
    }
  }, [lines]);

  const focus = () => inputRef.current?.focus();

  const exec = (raw: string) => {
    const cmd = raw.trim();
    const next: TermLine[] = [...lines, { kind: "in", text: cmd }];
    if (!cmd) {
      setLines(next);
      return;
    }
    if (cmd === "clear") {
      setLines([{ kind: "sys", text: "[terminal cleared]" }]);
      return;
    }
    const out = COMMANDS[cmd];
    if (out) {
      setLines([...next, ...out.map<TermLine>((t) => ({ kind: "out", text: t }))]);
    } else {
      setLines([...next, { kind: "err", text: `command not found: ${cmd}. type 'help' for available commands.` }]);
    }
    setHistory((h) => [cmd, ...h].slice(0, 50));
    setCursor(-1);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      exec(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const ni = Math.min(history.length - 1, cursor + 1);
      setCursor(ni);
      setInput(history[ni] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const ni = Math.max(-1, cursor - 1);
      setCursor(ni);
      setInput(ni === -1 ? "" : history[ni] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = KNOWN.find((k) => k.startsWith(input));
      if (match) setInput(match);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      exec("clear");
    }
  };

  return (
    <div
      id="terminal"
      onClick={focus}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur shadow-[0_30px_120px_-40px_hsl(var(--glow-cyan)/0.25)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">neural · zsh · 100x40</div>
        <div className="font-mono text-[10px] text-muted-foreground">⎆ hyprland</div>
      </div>

      <div
        ref={wrapRef}
        className="scrollbar-thin h-90 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <Line key={i} {...l} />
        ))}
        <div className="flex items-center gap-2">
          <span className="text-[hsl(var(--glow-cyan))]">{PROMPT}</span>
          {/* The block cursor stands in for the caret, so the input is sized to
              its content (1ch per character in this monospace font) and the
              native caret is hidden. A flexible input would push the cursor to
              the end of the row instead of trailing the text. */}
          <span className="flex items-center">
            <input
              ref={inputRef}
              value={input}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              aria-label="Terminal command input"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              style={{ width: `${input.length}ch` }}
              className="bg-transparent text-foreground caret-transparent outline-none"
            />
            <span className="inline-block h-4 w-1.5 shrink-0 animate-blink bg-foreground/80" />
            {!input && <span className="ml-2 select-none text-muted-foreground">type a command…</span>}
          </span>
        </div>
      </div>
    </div>
  );
}

function Line({ kind, text }: TermLine) {
  if (kind === "in") {
    return (
      <div className="flex items-start gap-2">
        <span className="text-[hsl(var(--glow-cyan))]">{PROMPT}</span>
        <span>{text}</span>
      </div>
    );
  }
  if (kind === "err") return <div className="text-red-400">{text}</div>;
  if (kind === "sys") return <div className="text-muted-foreground">{text}</div>;
  return <div className="whitespace-pre text-foreground/90">{text}</div>;
}
