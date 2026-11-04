import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "cn";
import { Button } from "./button.js";

interface ShowMoreState {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
}

const ShowMoreContext = React.createContext<ShowMoreState | null>(null);

function useShowMore(part: string): ShowMoreState {
  const context = React.useContext(ShowMoreContext);
  if (!context) throw new Error(`${part} must be used within <ShowMore>.`);
  return context;
}

/**
 * A long region shown in part, with one control to reveal the rest. The
 * content keeps its place in the document while collapsed — clipped, not
 * removed — so find-in-page and a screen reader still reach it.
 */
function ShowMore({
  className,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<"div"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [openState, setOpenState] = React.useState(defaultOpen);
  const open = openProp ?? openState;
  const contentId = React.useId();
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  return (
    <ShowMoreContext.Provider value={{ open, setOpen, contentId }}>
      <div
        data-slot="show-more"
        data-state={open ? "open" : "closed"}
        className={cn("flex flex-col gap-3", className)}
        {...props}
      />
    </ShowMoreContext.Provider>
  );
}

/**
 * The region. Collapsed, it stops at `collapsedHeight` and fades out over its
 * last few lines, which says "this continues" without a word.
 */
function ShowMoreContent({
  className,
  collapsedHeight = "8rem",
  style,
  ...props
}: React.ComponentProps<"div"> & {
  /** Any CSS length. */
  collapsedHeight?: string;
}) {
  const { open, contentId } = useShowMore("ShowMoreContent");
  return (
    <div
      id={contentId}
      data-slot="show-more-content"
      data-state={open ? "open" : "closed"}
      className={cn(
        "data-closed:max-h-(--collapsed) data-closed:overflow-hidden data-closed:mask-b-from-40%",
        className,
      )}
      style={{ "--collapsed": collapsedHeight, ...style } as React.CSSProperties}
      {...props}
    />
  );
}

/**
 * The control: a small pill on a hairline that runs the width of the region,
 * so it reads as a fold in the content rather than one more button in it.
 */
function ShowMoreTrigger({
  className,
  moreLabel = "Show more",
  lessLabel = "Show less",
  onClick,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & {
  moreLabel?: React.ReactNode;
  lessLabel?: React.ReactNode;
}) {
  const { open, setOpen, contentId } = useShowMore("ShowMoreTrigger");
  return (
    <div
      data-slot="show-more-trigger"
      className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
    >
      <Button
        variant="outline"
        size="sm"
        aria-expanded={open}
        aria-controls={contentId}
        className={cn("rounded-full pr-2 pl-3 aria-expanded:bg-transparent", className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen(!open);
        }}
        {...props}
      >
        {open ? lessLabel : moreLabel}
        <ChevronDownIcon
          data-icon="inline-end"
          className="transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-aria-expanded/button:rotate-180"
        />
      </Button>
    </div>
  );
}

export { ShowMore, ShowMoreContent, ShowMoreTrigger };
