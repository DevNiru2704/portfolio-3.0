"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, type ComponentType } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeOption {
  value: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

const options: ThemeOption[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "system", icon: Monitor, label: "System" },
  { value: "dark", icon: Moon, label: "Dark" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // Mount guard prevents a theme hydration mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-8 w-27 rounded-full border border-border bg-card/50" />;

  return (
    <div className="relative inline-flex h-8 items-center rounded-full border border-border bg-card/60 p-0.5 backdrop-blur">
      {options.map((o) => {
        const Icon = o.icon;
        const active = theme === o.value;
        return (
          <button
            key={o.value}
            onClick={() => setTheme(o.value)}
            aria-label={o.label}
            className={cn(
              "relative z-10 grid h-7 w-9 place-items-center rounded-full text-muted-foreground transition-colors",
              active && "bg-foreground text-background",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
