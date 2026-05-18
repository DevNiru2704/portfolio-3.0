'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const PROMPT = 'nirmalya@neural ~ $';

const COMMANDS = {
  whoami: [
    'nirmalya — full stack engineer · systems developer · ai + infrastructure',
  ],
  skills: [
    'react · next.js · typescript · django · postgresql · docker · terraform · go · aws · ai/ml',
  ],
  projects: [
    '[1] DevSync       — real-time developer collaboration platform',
    '[2] AI Study Buddy — AI-powered study assistant with content generation',
    '[3] InfraPilot    — infrastructure automation tool (terraform + natural language)',
  ],
  stack: [
    'frontend: next.js · react · typescript · tailwind',
    'backend:  django  · postgresql · supabase · go',
    'devops:   docker  · terraform · github actions · vercel',
    'ai/ml:    langchain · ollama · openai api · huggingface',
  ],
  status: [
    '● available for opportunities',
    '● location: kolkata, india (IST UTC+5:30)',
    '● open to: full-time · freelance · open source collaboration',
  ],
  contact: [
    'email:  nirmalya@example.com',
    'github: github.com/nirmalya',
  ],
  help: [
    'Available commands:',
    '  whoami    — about me',
    '  skills    — tech I work with',
    '  projects  — featured work',
    '  stack     — tools by layer',
    '  status    — availability',
    '  contact   — how to reach me',
    '  clear     — reset terminal',
    '  help      — this list',
  ],
  clear: [],
};

const KNOWN = Object.keys(COMMANDS);

export function Terminal() {
  const [lines, setLines] = useState([
    { kind: 'sys', text: 'neural command interface · v1.0.0' },
    { kind: 'sys', text: 'type “help” to begin. arrow keys for history. tab to autocomplete.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.scrollTop = wrapRef.current.scrollHeight;
    }
  }, [lines]);

  const focus = () => inputRef.current?.focus();

  const exec = (raw) => {
    const cmd = raw.trim();
    const next = [...lines, { kind: 'in', text: cmd }];
    if (!cmd) {
      setLines(next);
      return;
    }
    if (cmd === 'clear') {
      setLines([{ kind: 'sys', text: '[terminal cleared]' }]);
      return;
    }
    const out = COMMANDS[cmd];
    if (out) {
      setLines([...next, ...out.map((t) => ({ kind: 'out', text: t }))]);
    } else {
      setLines([
        ...next,
        { kind: 'err', text: `command not found: ${cmd}. type 'help' for available commands.` },
      ]);
    }
    setHistory((h) => [cmd, ...h].slice(0, 50));
    setCursor(-1);
  };

  const onKey = (e) => {
    if (e.key === 'Enter') {
      exec(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(history.length - 1, cursor + 1);
      setCursor(ni);
      setInput(history[ni] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = Math.max(-1, cursor - 1);
      setCursor(ni);
      setInput(ni === -1 ? '' : history[ni] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = KNOWN.find((k) => k.startsWith(input));
      if (match) setInput(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      exec('clear');
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
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          neural · zsh · 100x40
        </div>
        <div className="font-mono text-[10px] text-muted-foreground">
          ⎆ hyprland
        </div>
      </div>

      <div
        ref={wrapRef}
        className="scrollbar-thin h-[360px] overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <Line key={i} {...l} />
        ))}
        <div className="flex items-center gap-2">
          <span className="text-[hsl(var(--glow-cyan))]">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            placeholder="type a command…"
          />
          <span className="inline-block h-4 w-1.5 animate-blink bg-foreground/80" />
        </div>
      </div>
    </div>
  );
}

function Line({ kind, text }) {
  if (kind === 'in') {
    return (
      <div className="flex items-start gap-2">
        <span className="text-[hsl(var(--glow-cyan))]">{PROMPT}</span>
        <span>{text}</span>
      </div>
    );
  }
  if (kind === 'err') {
    return <div className="text-red-400">{text}</div>;
  }
  if (kind === 'sys') {
    return <div className="text-muted-foreground">{text}</div>;
  }
  return <div className="whitespace-pre text-foreground/90">{text}</div>;
}
