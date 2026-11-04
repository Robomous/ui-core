import {
  Badge,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@robomous/ui-core";
import { useState, type MouseEvent } from "react";

const PAGE_SIZE = 3;
// Neighbouring stills never share a scene, so a page of results does not repeat itself.
const SCENES = [
  { still: "aisle", camera: "cam-a12" },
  { still: "dock", camera: "cam-b07" },
  { still: "conveyor", camera: "cam-c03" },
  { still: "floor", camera: "cam-f02" },
  { still: "aisle-2", camera: "cam-a14" },
  { still: "yard", camera: "cam-y01" },
  { still: "dock-2", camera: "cam-b08" },
  { still: "conveyor-2", camera: "cam-c04" },
  { still: "aisle-3", camera: "cam-a15" },
  { still: "floor-2", camera: "cam-f03" },
  { still: "aisle-night", camera: "cam-a12" },
];
const TOTAL_FRAMES = 118;
const TOTAL_PAGES = Math.ceil(TOTAL_FRAMES / PAGE_SIZE);

/** Always show the first and last page and the current one with its neighbours; fold the rest into gaps. */
function visiblePages(current: number) {
  const pages = [1, current - 1, current, current + 1, TOTAL_PAGES]
    .filter((page) => page >= 1 && page <= TOTAL_PAGES)
    .filter((page, index, all) => all.indexOf(page) === index)
    .sort((a, b) => a - b);

  return pages.flatMap((page, index) =>
    index > 0 && page - pages[index - 1] > 1 ? ["gap" as const, page] : [page],
  );
}

/** A review queue footer: the count on one side, the pages on the other, the current page marked. */
export default function Overview() {
  const [page, setPage] = useState(3);
  const first = (page - 1) * PAGE_SIZE + 1;
  const last = Math.min(page * PAGE_SIZE, TOTAL_FRAMES);
  const frames = Array.from({ length: last - first + 1 }, (_, index) => first + index);

  function goTo(next: number) {
    return (event: MouseEvent) => {
      event.preventDefault();
      setPage(next);
    };
  }

  return (
    <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-lg border">
      <ul className="divide-y">
        {frames.map((frame) => {
          const scene = SCENES[frame % SCENES.length];

          return (
            <li key={frame} className="flex items-center gap-3 px-4 py-2.5">
              <img
                src={`/assets/frames/${scene.still}.svg`}
                alt=""
                className="aspect-video w-16 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
              />
              <div className="flex flex-1 flex-col gap-0.5">
                <span className="font-medium tabular-nums">
                  frame-{String(frame).padStart(4, "0")}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  {(frame % 5) + 2} boxes · {scene.camera}
                </span>
              </div>
              <Badge variant={frame % 4 === 0 ? "warning" : "quiet"}>
                {frame % 4 === 0 ? "Needs review" : "Queued"}
              </Badge>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-2.5">
        <p className="text-muted-foreground tabular-nums">
          Showing {first}–{last} of {TOTAL_FRAMES} frames
        </p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${page - 1}`}
                onClick={goTo(Math.max(1, page - 1))}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            {visiblePages(page).map((item, index) => (
              <PaginationItem key={item === "gap" ? `gap-${index}` : item}>
                {item === "gap" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={`?page=${item}`}
                    onClick={goTo(item)}
                    isActive={item === page}
                    className="tabular-nums"
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`?page=${page + 1}`}
                onClick={goTo(Math.min(TOTAL_PAGES, page + 1))}
                aria-disabled={page === TOTAL_PAGES}
                className={page === TOTAL_PAGES ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
