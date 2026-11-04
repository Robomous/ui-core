"use client";

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/button";
import { ButtonGroup } from "@/components/button-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Skeleton } from "@/components/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";

/** Whether an element's content is wider than its box, kept current as either resizes. */
function useOverflowsX() {
  const [node, setNode] = React.useState<HTMLDivElement | null>(null);
  const [overflows, setOverflows] = React.useState(false);
  React.useEffect(() => {
    if (!node) return;
    const measure = () => setOverflows(node.scrollWidth > node.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    if (node.firstElementChild) observer.observe(node.firstElementChild);
    return () => observer.disconnect();
  }, [node]);
  return { ref: setNode, overflows };
}

const TableFrameContext = React.createContext<{
  titleId: string;
  titled: boolean;
  setTitled: (titled: boolean) => void;
} | null>(null);

/**
 * The tray a table can sit in: a muted, rounded surface with an optional `TableFrameHeader` above
 * the table, for its name on the left and a status line on the right. The tray's corner is the
 * table's plus the tray's padding, so the two curves share a centre. A `TableFrameTitle` names the
 * table inside it for assistive technology, unless the table carries its own label.
 */
function TableFrame({ className, ...props }: React.ComponentProps<"div">) {
  const titleId = React.useId();
  const [titled, setTitled] = React.useState(false);
  const context = React.useMemo(() => ({ titleId, titled, setTitled }), [titleId, titled]);
  return (
    <TableFrameContext.Provider value={context}>
      <div
        data-slot="table-frame"
        className={cn(
          "flex w-full flex-col rounded-[calc(var(--radius-xl)+--spacing(2))] bg-muted/70 p-2 ring-1 ring-foreground/5 has-[>[data-slot=table-frame-header]]:pt-0 dark:bg-muted/40",
          className,
        )}
        {...props}
      />
    </TableFrameContext.Provider>
  );
}

function TableFrameHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-frame-header"
      className={cn(
        "flex h-10 items-center justify-between gap-4 px-2 text-[13px]/5 text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}

function TableFrameTitle({ className, id, ...props }: React.ComponentProps<"div">) {
  const frame = React.useContext(TableFrameContext);
  const setTitled = frame?.setTitled;
  React.useEffect(() => {
    if (!setTitled) return;
    setTitled(true);
    return () => setTitled(false);
  }, [setTitled]);
  return (
    <div
      data-slot="table-frame-title"
      id={id ?? frame?.titleId}
      className={cn("truncate", className)}
      {...props}
    />
  );
}

/**
 * A bordered, rounded card around a native table. The card is the scroll container too, so a wide
 * table scrolls inside its own corners instead of taking the page with it. Rows are divided by
 * hairlines only, the header sits on a faintly muted band and reads quieter than the data (muted
 * ink at normal weight, an optional leading icon per column), and a badge in a cell reads at the
 * cell's own size.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  const scrollable = useOverflowsX();
  const frame = React.useContext(TableFrameContext);
  const labelledBy =
    props["aria-labelledby"] ?? (frame?.titled && !props["aria-label"] ? frame.titleId : undefined);
  return (
    // The card draws the border and the focus ring; the container inside it
    // scrolls and fades the edge that has more to show. Split in two because
    // a mask erases everything at its element's edges, border and ring included.
    <div
      data-slot="table-card"
      className="relative w-full overflow-hidden rounded-xl border bg-card has-[>[data-slot=table-container]:focus-visible]:ring-[3px] has-[>[data-slot=table-container]:focus-visible]:ring-ring/50"
    >
      <div
        ref={scrollable.ref}
        data-slot="table-container"
        // A wide table is a scroll region a keyboard must be able to reach; one
        // that fits adds no tab stop.
        tabIndex={scrollable.overflows ? 0 : undefined}
        className="w-full overflow-x-auto outline-none supports-[animation-timeline:scroll()]:scroll-fade-x"
      >
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-[13px]/5", className)}
          {...props}
          aria-labelledby={labelledBy}
        />
      </div>
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-muted/40 [&_tr]:border-b [&_tr]:hover:bg-transparent", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

/**
 * The closing band for a summary, a mirror of the header: the same faint surface, and the first
 * cell read as the row's label in muted ink, so the figures after it carry the weight.
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/40 font-medium tabular-nums [&_td]:h-11 [&_td]:py-0 [&_td:first-child]:font-normal [&_td:first-child]:text-muted-foreground [&_tr]:hover:bg-transparent [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        // No transition: a row is hovered dozens of times a pass down the table,
        // so its tint follows the pointer at once.
        "border-b hover:bg-muted/40 has-aria-expanded:bg-muted/40 data-[state=selected]:bg-muted/70",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        // A leading icon sits inline before the label, nudged down to the
        // label's x-height so the two read as one line.
        "h-10 px-3 text-left align-middle font-normal whitespace-nowrap text-muted-foreground first:pl-4 last:pr-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:stroke-[1.75] [&_svg:not([class*='size-'])]:size-3.5 [&>svg]:mr-2 [&>svg]:inline-block [&>svg]:align-[-0.15em] [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-3 py-3 align-middle whitespace-nowrap first:pl-4 last:pr-4 [&:has([role=checkbox])]:pr-0 [&_[data-slot=badge]]:h-6 [&_[data-slot=badge]]:px-2.5 [&_[data-slot=badge]]:text-[13px] [&_[data-slot=badge]]:font-normal",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("border-t px-4 py-3 text-left text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function PagerButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={label}
          disabled={disabled}
          onClick={onClick}
          // Dim the glyph, not the button: an opacity would fade the shared
          // border too and break the group's outline.
          className="text-muted-foreground hover:text-foreground disabled:text-muted-foreground/40 disabled:opacity-100 [&_svg]:stroke-[1.75]"
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

/**
 * The table's footer when it pages: the range on the left; on the right Rows per page, the
 * page position in a fixed lane, and first / previous / next / last. It is a `<tfoot>`, so it
 * sits inside the table's own frame; `colSpan` should cover every column. With one page or
 * none (`pageCount <= 1`) it is a count only (`total` and `unit`), and `loading` swaps the
 * range and page number for skeletons and disables the pager. The range is a polite live
 * region, so a page change announces itself.
 */
function TablePagination({
  className,
  colSpan = 100,
  page,
  pageCount,
  pageSize,
  total,
  unit = "rows",
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  loading = false,
  ...props
}: Omit<React.ComponentProps<"tfoot">, "children"> & {
  colSpan?: number;
  /** The current page, from 1. */
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  /** The noun after the count when there is no pager: `3 runs`. */
  unit?: string;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  loading?: boolean;
}) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const paged = pageCount > 1;
  const first = page <= 1;
  const last = page >= pageCount;

  return (
    <tfoot
      data-slot="table-pagination"
      className={cn("border-t bg-muted/40 tabular-nums", className)}
      {...props}
    >
      <tr>
        <td colSpan={colSpan} className="h-12 px-4 py-0">
          <div className="flex items-center justify-between gap-4">
            <div aria-live="polite" className="flex items-center gap-1 text-muted-foreground">
              {loading ? (
                <Skeleton className="h-3.5 w-24 rounded-sm bg-muted-foreground/20" />
              ) : paged ? (
                <>
                  <span className="text-foreground">
                    {from}–{to}
                  </span>
                  of
                  <span className="text-foreground">{total}</span>
                </>
              ) : (
                <>
                  <span className="text-foreground">{total}</span>
                  {unit}
                </>
              )}
            </div>
            {paged || loading ? (
              <TooltipProvider>
                <div className="flex items-center gap-5 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>Rows per page</span>
                    <Select
                      value={String(pageSize)}
                      onValueChange={(value) => onPageSizeChange?.(Number(value))}
                    >
                      <SelectTrigger aria-label="Rows per page" className="text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent align="end">
                        {pageSizeOptions.map((option) => (
                          <SelectItem key={option} value={String(option)}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* A fixed lane, so the pager doesn't shift as the page number grows a digit. */}
                  <div className="flex w-24 shrink-0 items-center justify-end gap-1">
                    Page
                    {loading ? (
                      <Skeleton className="h-3.5 w-12 shrink-0 rounded-sm bg-muted-foreground/20" />
                    ) : (
                      <>
                        <span className="text-foreground">{page}</span>
                        of
                        <span className="text-foreground">{pageCount}</span>
                      </>
                    )}
                  </div>
                  <ButtonGroup aria-label="Pagination">
                    <PagerButton
                      label="First page"
                      disabled={loading || first}
                      onClick={() => onPageChange?.(1)}
                    >
                      <ChevronsLeftIcon />
                    </PagerButton>
                    <PagerButton
                      label="Previous page"
                      disabled={loading || first}
                      onClick={() => onPageChange?.(page - 1)}
                    >
                      <ChevronLeftIcon />
                    </PagerButton>
                    <PagerButton
                      label="Next page"
                      disabled={loading || last}
                      onClick={() => onPageChange?.(page + 1)}
                    >
                      <ChevronRightIcon />
                    </PagerButton>
                    <PagerButton
                      label="Last page"
                      disabled={loading || last}
                      onClick={() => onPageChange?.(pageCount)}
                    >
                      <ChevronsRightIcon />
                    </PagerButton>
                  </ButtonGroup>
                </div>
              </TooltipProvider>
            ) : null}
          </div>
        </td>
      </tr>
    </tfoot>
  );
}

export {
  TableFrame,
  TableFrameHeader,
  TableFrameTitle,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TablePagination,
};
