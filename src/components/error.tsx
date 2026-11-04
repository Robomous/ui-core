import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlertIcon, ExternalLinkIcon } from "lucide-react";

import { cn } from "cn";

const errorMessageVariants = cva(
  "flex items-start gap-1.5 font-normal text-destructive [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-3 [&_a:hover]:text-foreground",
  {
    variants: {
      size: {
        sm: "text-[0.6875rem]/4 [&>svg]:mt-0.5 [&>svg]:size-3",
        default: "text-xs/relaxed [&>svg]:mt-[0.2rem] [&>svg]:size-3.5",
        lg: "text-sm/6 [&>svg]:mt-[0.3rem] [&>svg]:size-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

/** A failure with a way out: what went wrong, then a link to the next step. */
interface ErrorDetail {
  message: string;
  /** The link's words, a named next step: `Contact support`, `Reconnect GitHub`. */
  action?: string;
  link?: string;
}

/**
 * An inline error: one sentence in the destructive ink behind an alert icon.
 * Named `ErrorMessage` rather than `Error`, which would shadow the global
 * constructor in every file that imports it. With no visible `label`, the
 * word "Error" is still read out first, so the sentence never arrives without
 * its status.
 */
function ErrorMessage({
  className,
  size = "default",
  label,
  error,
  children,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof errorMessageVariants> & {
    /** A visible lead-in: `Email error`. A colon is added after it. */
    label?: React.ReactNode;
    /** A message string, a thrown `Error`, or a message with a follow-up link. Children win. */
    error?: string | globalThis.Error | ErrorDetail;
  }) {
  // A thrown Error's `message` is not enumerable, so it is read, not spread.
  const detail: ErrorDetail | undefined =
    typeof error === "string" || error instanceof globalThis.Error
      ? { message: typeof error === "string" ? error : error.message }
      : error;

  return (
    <p
      data-slot="error-message"
      data-size={size}
      role="alert"
      className={cn(errorMessageVariants({ size }), className)}
      {...props}
    >
      <CircleAlertIcon aria-hidden className="shrink-0" />
      <span className="min-w-0 text-pretty">
        {label ? (
          <span className="mr-1 font-medium">{label}:</span>
        ) : (
          <span className="sr-only">Error: </span>
        )}
        {children ?? detail?.message}
        {!children && detail?.link && (
          <>
            {" "}
            <a
              href={detail.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5"
            >
              {detail.action ?? "Learn more"}
              <ExternalLinkIcon aria-hidden className="size-[0.9em]" />
            </a>
          </>
        )}
      </span>
    </p>
  );
}

export { ErrorMessage, errorMessageVariants };
