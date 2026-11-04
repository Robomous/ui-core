import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "cn";

// Every variant is the same quiet box: no fill, a neutral hairline, the title
// in the foreground and the description muted. The status lives in the icon
// alone, the one mark that needs colour to be read at a glance; the title says
// the rest in words. Status is never a stroke on a container, so the border
// stays neutral too.
const alertVariants = cva(
  "group/alert grid w-full grid-cols-[minmax(0,1fr)] gap-x-2.5 gap-y-1 rounded-lg border bg-transparent px-3 py-2.5 text-left text-xs/relaxed text-foreground has-[>svg]:grid-cols-[auto_minmax(0,1fr)] has-data-[slot=alert-action]:grid-cols-[minmax(0,1fr)_auto] has-[>svg]:has-data-[slot=alert-action]:grid-cols-[auto_minmax(0,1fr)_auto] *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:stroke-[1.75] *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "*:[svg]:text-muted-foreground",
        info: "*:[svg]:text-info",
        success: "*:[svg]:text-success",
        warning: "*:[svg]:text-warning",
        destructive: "*:[svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

// A condition that needs attention is announced the moment it mounts; one that
// only informs waits its turn in a polite live region.
const alertRoles = {
  default: "alert",
  info: "status",
  success: "status",
  warning: "alert",
  destructive: "alert",
} as const;

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role={alertRoles[variant ?? "default"]}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

// Links are underlined at a fraction of their ink and take the full ink on
// hover, so a link in an alert is findable without striping the notice.
const links =
  "[&_a]:underline [&_a]:decoration-current/40 [&_a]:underline-offset-3 [&_a]:hover:decoration-current";

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "pt-px text-sm/4.5 font-medium text-balance group-has-[>svg]/alert:col-start-2",
        links,
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-xs/relaxed text-pretty text-muted-foreground group-has-[>svg]/alert:col-start-2 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-2",
        links,
        className,
      )}
      {...props}
    />
  );
}

// The action takes its own column, so the text wraps before it instead of
// running under it. Its box is one title line tall and centres what it holds,
// so a small button or an icon button lines up with the first line of text.
function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn(
        "col-[-2/-1] row-span-2 row-start-1 ml-2 flex h-5 items-center gap-1 self-start",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
