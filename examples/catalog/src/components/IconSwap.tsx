import type { ReactNode } from "react";

/**
 * Two icons in one cell, cross-faded by state. The inactive one stays in the
 * DOM, so the swap is a transition (interruptible, no flash) rather than a
 * mount: it shrinks to a quarter, fades and blurs on its way out, and the
 * incoming one does the reverse. `prefers-reduced-motion` collapses the
 * duration through the stylesheet's base layer.
 */
export default function IconSwap({
  active,
  on,
  off,
}: {
  active: boolean;
  on: ReactNode;
  off: ReactNode;
}) {
  return (
    <span className="inline-grid place-items-center *:[grid-area:1/1]">
      <span
        aria-hidden={!active}
        className={`inline-grid transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${
          active ? "scale-100 opacity-100 blur-none" : "scale-25 opacity-0 blur-xs"
        }`}
      >
        {on}
      </span>
      <span
        aria-hidden={active}
        className={`inline-grid transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${
          active ? "scale-25 opacity-0 blur-xs" : "scale-100 opacity-100 blur-none"
        }`}
      >
        {off}
      </span>
    </span>
  );
}
