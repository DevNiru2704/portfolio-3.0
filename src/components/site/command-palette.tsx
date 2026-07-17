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
import {
  ArrowRight,
  Download,
  FileCode2,
  FlaskConical,
  Github,
  Home,
  Linkedin,
  Mail,
  Newspaper,
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

  // The palette has no anchors, so trigger the download through a throwaway one
  // rather than navigating away from the page.
  const downloadResume = useCallback(() => {
    setOpen(false);
    const link = document.createElement("a");
    link.href = owner.resumeUrl;
    link.download = owner.resumeFileName;
    link.rel = "noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

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
        <CommandInput placeholder="Type a command, search projects, jump anywhere…" />
        <CommandList className="max-h-105">
          <CommandEmpty>No results. Try &lsquo;projects&rsquo;, &lsquo;blog&rsquo; or &lsquo;contact&rsquo;.</CommandEmpty>

          {/* Order mirrors `navigation` in config/owner.ts - keep them in sync. */}
          <CommandGroup heading="Navigation">
            <Item icon={Home} label="Home" onSelect={() => go("/")} />
            <Item icon={User} label="About" onSelect={() => go("/about")} />
            <Item icon={FileCode2} label="Projects" hint="↳ case studies" onSelect={() => go("/projects")} />
            <Item icon={FlaskConical} label="Lab" onSelect={() => go("/lab")} />
            <Item icon={Newspaper} label="Blog" onSelect={() => go("/blog")} />
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
            <Item icon={Download} label="Download CV" hint="pdf" onSelect={downloadResume} />
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

          <CommandGroup heading="Social">
            <Item icon={Github} label={`GitHub - @${owner.githubUser}`} onSelect={() => { window.open(owner.github, "_blank"); setOpen(false); }} />
            <Item icon={Linkedin} label="LinkedIn" onSelect={() => { window.open(owner.linkedin, "_blank"); setOpen(false); }} />
            <Item icon={Mail} label={`Email · ${owner.email}`} onSelect={() => { router.push("/contact"); setOpen(false); }} />
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
