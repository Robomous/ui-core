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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { Skeleton } from "@/components/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/tooltip";

/**
 * A bordered, rounded frame around a native table. The frame is the scroll
 * container too, so a wide table scrolls inside its own corners instead of
 * taking the page with it. Every column keeps a vertical rule (`border-r`, none
 * on the last), the header and footer sit on a muted surface, and the header
 * reads quieter than the data: muted ink at normal weight.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto rounded-xl border">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-muted/50 [&_tr]:border-b [&_tr]:hover:bg-transparent", className)}
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

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&_td]:h-12 [&_td]:py-0 [&_tr]:hover:bg-transparent [&>tr]:last:border-b-0",
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
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
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
        "h-11 border-r px-3 text-left align-middle font-normal whitespace-nowrap text-muted-foreground last:border-r-0 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 [&:has([role=checkbox])]:pr-0",
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
        "border-r px-3 py-4 align-middle whitespace-nowrap last:border-r-0 [&:has([role=checkbox])]:pr-0",
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
      className={cn("border-t px-3 py-3 text-left text-sm text-muted-foreground", className)}
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
          className="[&_svg]:stroke-[1.75]"
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
      className={cn("border-t bg-muted/50", className)}
      {...props}
    >
      <tr>
        <td colSpan={colSpan} className="h-12 px-3 py-0">
          <div className="flex items-center justify-between gap-4">
            <div aria-live="polite" className="flex items-center gap-1.5 text-sm">
              {loading ? (
                <Skeleton className="h-3.5 w-24 rounded-sm bg-muted-foreground/20" />
              ) : paged ? (
                <>
                  <span className="font-mono tabular-nums">
                    {from}–{to}
                  </span>
                  <span>of</span>
                  <span className="font-mono tabular-nums">{total}</span>
                </>
              ) : (
                <>
                  <span className="font-mono tabular-nums">{total}</span>
                  <span>{unit}</span>
                </>
              )}
            </div>
            {paged || loading ? (
              <TooltipProvider>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Rows per page</span>
                    <Select
                      value={String(pageSize)}
                      onValueChange={(value) => onPageSizeChange?.(Number(value))}
                    >
                      <SelectTrigger aria-label="Rows per page" className="w-16 font-mono">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {pageSizeOptions.map((option) => (
                          <SelectItem key={option} value={String(option)} className="font-mono">
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex w-26 shrink-0 items-center justify-end gap-1.5">
                    <span>Page</span>
                    {loading ? (
                      <Skeleton className="h-3.5 w-14 shrink-0 rounded-sm bg-muted-foreground/20" />
                    ) : (
                      <>
                        <span className="font-mono tabular-nums">{page}</span>
                        <span>of</span>
                        <span className="font-mono tabular-nums">{pageCount}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
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
                  </div>
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
