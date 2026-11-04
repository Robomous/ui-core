import { cn } from "cn";

// A tenth of the foreground, not `muted`: muted is one step off white and the
// pulse halves it again, so a placeholder on a card all but disappeared. This
// reads in both themes, on the page and on a card alike.
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-foreground/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
