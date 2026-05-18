'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function MagneticButton({ href, children, className, variant = 'primary', external = false, ...props }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
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
    'group relative inline-flex h-11 select-none items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors';
  const styles =
    variant === 'primary'
      ? 'bg-foreground text-background hover:bg-foreground/90'
      : 'border border-border bg-card/60 text-foreground hover:border-foreground/30 backdrop-blur';

  const Cmp = href ? (external ? 'a' : Link) : 'button';
  const linkProps = href
    ? external
      ? { href, target: '_blank', rel: 'noreferrer' }
      : { href }
    : {};

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className="inline-block"
    >
      <Cmp className={cn(base, styles, className)} {...linkProps} {...props}>
        {children}
      </Cmp>
    </motion.div>
  );
}
