"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { owner, navigation, secondaryNav } from "@/config/owner";
import { useCommandPalette } from "./command-palette";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const palette = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-border/60 bg-background/70 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-border bg-card text-[10px] font-bold tracking-tight">
              <span className="absolute inset-0 rounded-lg bg-[hsl(var(--signal)/0.12)]" />
              <span className="relative z-10 text-signal">{owner.brand.initials}</span>
            </span>
            <div className="hidden flex-col leading-none sm:flex">
              <span className="text-[13px] font-semibold tracking-tight">{owner.brand.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground">{owner.brand.productLine}</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-sm transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-card border border-border"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => palette.setOpen(true)}
              className="group hidden h-8 items-center gap-2 rounded-full border border-border bg-card/60 pl-3 pr-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground md:inline-flex"
            >
              <Command className="h-3.5 w-3.5" />
              <span>Command…</span>
              <kbd className="ml-1 rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px]">⌘K</kbd>
            </button>
            <a
              href={owner.resumeUrl}
              download={owner.resumeFileName}
              target="_blank"
              rel="noreferrer"
              className="hidden h-8 items-center gap-1.5 rounded-full bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90 sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              Download CV
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden inline-grid h-8 w-8 place-items-center rounded-md border border-border bg-card/60"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container grid grid-cols-2 gap-1 py-4">
              {[...navigation, ...secondaryNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md border border-border bg-card/60 px-3 py-2.5 text-sm transition-colors hover:text-foreground",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={owner.resumeUrl}
                download={owner.resumeFileName}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-3 py-2.5 text-sm font-medium text-background"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16" />
    </>
  );
}
