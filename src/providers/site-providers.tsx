"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { CommandPaletteProvider } from "@/components/site/command-palette";
import { Toaster } from "@/components/ui/sonner";
import { CursorSpotlight } from "@/components/site/cursor-spotlight";
import type { Project } from "@/types/content";

interface SiteProvidersProps {
  children: ReactNode;
  projects: Project[];
}

export function SiteProviders({ children, projects }: SiteProvidersProps) {
  return (
    <ThemeProvider>
      <CommandPaletteProvider projects={projects}>
        <CursorSpotlight />
        {children}
        <Toaster position="bottom-right" theme="system" toastOptions={{ className: "glass !rounded-lg" }} />
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
