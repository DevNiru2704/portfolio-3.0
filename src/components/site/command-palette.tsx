"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  FileCode2,
  FlaskConical,
  Github,
  Home,
  Linkedin,
  Mail,
  Moon,
  Newspaper,
  Sun,
  Monitor,
  Terminal as TerminalIcon,
  LayoutDashboard,
  Sparkles,
  Compass,
  User,
  Atom,
  CalendarDays,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { owner } from "@/config/owner";
import type { Project } from "@/types/content";

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Ctx = createContext<CommandPaletteContextValue>({ open: false, setOpen: () => {} });
export const useCommandPalette = () => useContext(Ctx);

interface CommandPaletteProviderProps {
  children: ReactNode;
  projects: Project[];
}

export function CommandPaletteProvider({ children, projects }: CommandPaletteProviderProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setTimeout(() => router.push(href), 60);
    },
    [router],
  );

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
          <div className="flex h-5 items-center gap-1.5 rounded-full border border-border bg-card px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            online
          </div>
          <div className="text-[11px] text-muted-foreground">Neural Command Interface</div>
        </div>
        <CommandInput placeholder="Type a command, search projects, switch theme…" />
        <CommandList className="max-h-105">
          <CommandEmpty>No results. Try &lsquo;projects&rsquo;, &lsquo;contact&rsquo; or &lsquo;dark&rsquo;.</CommandEmpty>

          <CommandGroup heading="Navigation">
            <Item icon={Home} label="Home" onSelect={() => go("/")} />
            <Item icon={FileCode2} label="Projects" hint="↳ case studies" onSelect={() => go("/projects")} />
            <Item icon={FlaskConical} label="Lab" onSelect={() => go("/lab")} />
            <Item icon={Newspaper} label="Blog" onSelect={() => go("/blog")} />
            <Item icon={User} label="About" onSelect={() => go("/about")} />
            <Item icon={CalendarDays} label="Now" onSelect={() => go("/now")} />
            <Item icon={Atom} label="Philosophy" onSelect={() => go("/philosophy")} />
            <Item icon={Mail} label="Contact" onSelect={() => go("/contact")} />
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Projects">
            {projects.map((p) => (
              <Item key={p.id} icon={Sparkles} label={p.title} hint={p.category} onSelect={() => go(`/projects/${p.slug}`)} />
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <Item icon={LayoutDashboard} label="Open CMS Preview" hint="public demo" onSelect={() => go("/cms-preview")} />
            <Item icon={Compass} label="Open Dashboard" hint="private" onSelect={() => go("/dashboard")} />
            <Item
              icon={TerminalIcon}
              label="Jump to terminal section"
              onSelect={() => {
                setOpen(false);
                setTimeout(() => {
                  document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 60);
              }}
            />
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <Item icon={Sun} label="Light mode" onSelect={() => { setTheme("light"); setOpen(false); }} />
            <Item icon={Moon} label="Dark mode" onSelect={() => { setTheme("dark"); setOpen(false); }} />
            <Item icon={Monitor} label="System theme" onSelect={() => { setTheme("system"); setOpen(false); }} />
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Social">
            <Item icon={Github} label="GitHub — @nirmalya" onSelect={() => { window.open(owner.github, "_blank"); setOpen(false); }} />
            <Item icon={Linkedin} label="LinkedIn" onSelect={() => { window.open(owner.linkedin, "_blank"); setOpen(false); }} />
            <Item icon={Mail} label={`Email · ${owner.email}`} onSelect={() => { window.location.href = `mailto:${owner.email}`; setOpen(false); }} />
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </Ctx.Provider>
  );
}

interface ItemProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  hint?: string;
  onSelect: () => void;
}

function Item({ icon: Icon, label, hint, onSelect }: ItemProps) {
  return (
    <CommandItem onSelect={onSelect} className="group gap-2.5">
      <Icon className="h-4 w-4 text-muted-foreground group-data-[selected=true]:text-foreground" />
      <span className="flex-1">{label}</span>
      {hint ? <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{hint}</span> : null}
      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-data-[selected=true]:opacity-60" />
    </CommandItem>
  );
}
