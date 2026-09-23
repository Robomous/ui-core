import { Button } from "@robomous/ui-core";
import { ChevronLeftIcon, ChevronRightIcon } from "@robomous/ui-core/icons";

import type { NavLink } from "@/lib/nav";

/** The page before and after this one, in reading order. Rendered statically. */
export default function PrevNext({ prev, next }: { prev?: NavLink; next?: NavLink }) {
  return (
    <nav aria-label="Previous and next page" className="flex justify-between gap-4 border-t pt-6">
      {prev ? (
        <Button asChild variant="ghost" className="h-auto py-2">
          <a href={prev.href} rel="prev">
            <ChevronLeftIcon data-icon="inline-start" />
            <span className="flex flex-col items-start">
              <span className="text-xs font-normal text-muted-foreground">Previous</span>
              {prev.title}
            </span>
          </a>
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button asChild variant="ghost" className="h-auto py-2">
          <a href={next.href} rel="next">
            <span className="flex flex-col items-end">
              <span className="text-xs font-normal text-muted-foreground">Next</span>
              {next.title}
            </span>
            <ChevronRightIcon data-icon="inline-end" />
          </a>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}
