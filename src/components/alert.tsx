import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "cn";

const alertVariants = cva(
  "group/alert relative grid min-h-11 w-full gap-0.5 rounded-lg border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-24 has-[>svg]:grid-cols-[1.25rem_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:my-0.5 *:[svg]:self-start *:[svg]:justify-self-center *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        // The status recipe, as on Badge: the status's surface role under its ink
        // role, the icon and the description in that same ink, border transparent.
        info: "border-transparent bg-info-surface text-info *:data-[slot=alert-description]:text-info",
        success:
          "border-transparent bg-success-surface text-success *:data-[slot=alert-description]:text-success",
        warning:
          "border-transparent bg-warning-surface text-warning *:data-[slot=alert-description]:text-warning",
        destructive:
          // The destructive tint, as on Button: the role has no surface of its own.
          "border-transparent bg-destructive/10 text-destructive *:data-[slot=alert-description]:text-destructive dark:bg-destructive/20",
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

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "pt-px text-sm/4.5 font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
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
        "text-[13px]/4.5 text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-action" className={cn("absolute top-2 right-2", className)} {...props} />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
