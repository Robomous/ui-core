import { ChevronLeftIcon, ChevronRightIcon } from "@robomous/ui-core/icons";

import type { NavLink } from "@/lib/nav";

const card =
  "group/page-link flex flex-col gap-1 rounded-md border px-4 py-3 transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none";

/**
 * The page before and after this one, in reading order. Each is a whole card,
 * so the target is the size of what it says, with the group underneath as
 * the hint of where the step lands.
 */
export default function PrevNext({ prev, next }: { prev?: NavLink; next?: NavLink }) {
  if (!prev && !next) return null;
  return (
    <nav
      aria-label="Previous and next page"
      className="grid gap-3 border-t px-(--gutter) py-8 sm:grid-cols-2"
    >
      {prev ? (
        <a href={prev.href} rel="prev" className={card}>
          <span className="text-xs text-muted-foreground">Previous</span>
          <span className="flex items-center gap-1 text-sm font-medium">
            <ChevronLeftIcon className="-ml-1 size-4 text-muted-foreground transition-transform duration-150 ease-out group-hover/page-link:-translate-x-0.5" />
            {prev.title}
          </span>
        </a>
      ) : (
        <span aria-hidden="true" className="hidden sm:block" />
      )}
      {next ? (
        <a href={next.href} rel="next" className={`${card} items-end text-right`}>
          <span className="text-xs text-muted-foreground">Next</span>
          <span className="flex items-center gap-1 text-sm font-medium">
            {next.title}
            <ChevronRightIcon className="-mr-1 size-4 text-muted-foreground transition-transform duration-150 ease-out group-hover/page-link:translate-x-0.5" />
          </span>
        </a>
      ) : null}
    </nav>
  );
}
