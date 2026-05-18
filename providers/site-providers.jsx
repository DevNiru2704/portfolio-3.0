'use client';

import { ThemeProvider } from './theme-provider';
import { CommandPaletteProvider } from '@/components/site/command-palette';
import { Toaster } from '@/components/ui/sonner';
import { CursorSpotlight } from '@/components/site/cursor-spotlight';

export function SiteProviders({ children }) {
  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <CursorSpotlight />
        {children}
        <Toaster
          position="bottom-right"
          theme="system"
          toastOptions={{ className: 'glass !rounded-lg' }}
        />
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
