'use client';

import { useEffect, useRef } from 'react';

export function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0, ty = 0;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty('--mx', tx + 'px');
          el.style.setProperty('--my', ty + 'px');
          raf = 0;
        });
      }
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
      style={{
        background:
          'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), hsl(var(--glow-cyan) / 0.06), transparent 50%)',
      }}
    />
  );
}
