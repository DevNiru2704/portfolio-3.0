import { cn } from "@/lib/utils";

/**
 * The NM monogram: one continuous path where N's right leg is also M's left leg.
 * Drawn on a 24x24 grid, all coordinates on whole units.
 *
 * Two values are load-bearing and were tuned by rendering, not by taste:
 *  - strokeWidth 2.5, not 2. A 2u stroke is ~1.33 device pixels at favicon size,
 *    lands between the pixel grid, and turns to mud.
 *  - linejoin bevel, not miter. The acute joins at the two peaks throw miter
 *    spikes well past the cap height.
 *
 * Colour comes from `currentColor`, so callers set it with text-signal.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-full w-full", className)}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 20 V4 L12 20 V4 L16 12 L20 4 V20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="butt"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}
