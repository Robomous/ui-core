import * as React from "react";

import { cn } from "cn";

/**
 * Three dots for work running in the background, set inline after the words
 * that name it: `Saving`, `Deploying`. The dots are decoration — the label
 * carries the meaning — so they are hidden from assistive technology, and the
 * wrapper is a polite live region that announces the label once.
 */
function LoadingDots({
  className,
  children,
  size = 4,
  style,
  ...props
}: React.ComponentProps<"span"> & {
  /** Dot diameter in px. Pass it only when the default doesn't match the adjacent type. */
  size?: number;
}) {
  return (
    <span
      data-slot="loading-dots"
      aria-live="polite"
      className={cn("inline-flex items-center gap-1.5", className)}
      style={{ "--dot": `${size}px`, ...style } as React.CSSProperties}
      {...props}
    >
      {children}
      <span aria-hidden className="inline-flex items-center gap-(--dot)">
        {[0, 160, 320].map((delay) => (
          <span
            key={delay}
            className="size-(--dot) animate-[loading-dot_1.2s_ease-in-out_infinite] rounded-full bg-current opacity-25"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </span>
    </span>
  );
}

export { LoadingDots };
