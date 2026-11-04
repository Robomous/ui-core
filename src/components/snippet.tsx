import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "cn";
import { CopyIconSwap, useCopy } from "@/lib/clipboard";
import { Button } from "./button.js";

const snippetVariants = cva(
  "flex w-fit max-w-full min-w-64 items-center gap-2 rounded-md border py-1 pr-1 pl-3 font-mono text-xs/5",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        inverted: "border-transparent bg-foreground text-background",
        info: "border-transparent bg-info-surface text-info",
        success: "border-transparent bg-success-surface text-success",
        warning: "border-transparent bg-warning-surface text-warning",
        error: "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/**
 * A command the reader is meant to run, with its copy button. The `$` prompt
 * is drawn by the component and never copied, so `text` is the bare command;
 * an array is a short multi-line block, copied joined by newlines.
 */
function Snippet({
  className,
  variant = "default",
  text,
  prompt = true,
  copyText,
  copied,
  onCopy,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> &
  VariantProps<typeof snippetVariants> & {
    text: string | string[];
    /** The `$` before each line. Turn it off for anything that is not a shell command. */
    prompt?: boolean;
    /** What lands on the clipboard, when it differs from what is shown. */
    copyText?: string;
    /** Drive the checkmark from outside, for a parent that copies something else. */
    copied?: boolean;
    onCopy?: (text: string) => void;
  }) {
  const lines = Array.isArray(text) ? text : [text];
  const copy = useCopy({ copied, onCopy });

  return (
    <div
      data-slot="snippet"
      data-variant={variant}
      className={cn(snippetVariants({ variant }), className)}
      {...props}
    >
      <pre className="min-w-0 flex-1 overflow-x-auto py-1 supports-[animation-timeline:scroll()]:scroll-fade-x font-[inherit] whitespace-pre">
        {lines.map((line, index) => (
          <div key={index}>
            {prompt && (
              <span aria-hidden className="opacity-60 select-none">
                ${" "}
              </span>
            )}
            {line}
          </div>
        ))}
      </pre>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Copy to clipboard"
        data-copied={copy.copied || undefined}
        className="shrink-0 self-center text-inherit opacity-70 hover:bg-current/10 hover:text-inherit hover:opacity-100 data-copied:opacity-100"
        onClick={() => copy.copy(copyText ?? lines.join("\n"))}
      >
        <CopyIconSwap copied={copy.copied} />
      </Button>
      <span aria-live="polite" className="sr-only">
        {copy.copied ? "Copied" : ""}
      </span>
    </div>
  );
}

export { Snippet, snippetVariants };
