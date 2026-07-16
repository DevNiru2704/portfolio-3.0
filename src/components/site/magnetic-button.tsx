"use client";

import { useRef, type ReactNode, type MouseEvent, type ElementType } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost";
  external?: boolean;
  /** Filename to save as. Renders a plain anchor that downloads instead of navigating. */
  download?: string;
}

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
  external = false,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.18);
    y.set((e.clientY - cy) * 0.18);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex h-11 select-none items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/90"
      : "border border-border bg-card/60 text-foreground hover:border-foreground/30 backdrop-blur";

  // A download needs a real anchor: next/link would try to route to the file.
  const isAnchor = Boolean(href) && (external || Boolean(download));
  const Cmp = (href ? (isAnchor ? "a" : Link) : "button") as ElementType;
  const linkProps: Record<string, unknown> = href
    ? download
      ? { href, download, target: "_blank", rel: "noreferrer" }
      : external
        ? { href, target: "_blank", rel: "noreferrer" }
        : { href }
    : {};

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x, y }} className="inline-block">
      <Cmp className={cn(base, styles, className)} {...linkProps}>
        {children}
      </Cmp>
    </motion.div>
  );
}
