import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "cn";

/**
 * Copy text and hold a `copied` flag long enough to be read: the shared
 * behaviour of Snippet and CodeBlock. `copied` can be driven from outside, so
 * a parent that copies something else can still borrow the checkmark.
 */
function useCopy({
  copied: copiedProp,
  onCopy,
  resetAfter = 2000,
}: {
  copied?: boolean;
  onCopy?: (text: string) => void;
  resetAfter?: number;
} = {}) {
  const [copiedState, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = React.useCallback(
    async (text: string) => {
      // A browser without the async clipboard (an insecure origin, an old
      // engine) still gets the callback, so a caller's own fallback can run.
      try {
        await navigator.clipboard?.writeText(text);
      } catch {
        // Permission denied: the flag still flips, the callback still runs.
      }
      onCopy?.(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfter);
    },
    [onCopy, resetAfter],
  );

  return { copied: copiedProp ?? copiedState, copy };
}

/**
 * The copy glyph and the check, stacked in one cell and cross-faded: opacity,
 * scale from a quarter and a 4px blur, so the swap reads as one icon changing
 * its mind rather than two icons trading places.
 */
function CopyIconSwap({ copied, className }: { copied: boolean; className?: string }) {
  const icon =
    "col-start-1 row-start-1 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)]";
  return (
    <span aria-hidden className={cn("grid place-items-center", className)}>
      <CopyIcon className={cn(icon, copied && "scale-25 opacity-0 blur-xs")} />
      <CheckIcon className={cn(icon, !copied && "scale-25 opacity-0 blur-xs")} />
    </span>
  );
}

export { CopyIconSwap, useCopy };
