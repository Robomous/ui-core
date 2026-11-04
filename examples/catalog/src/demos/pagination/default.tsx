import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@robomous/ui-core";

const runs = [
  { name: "run-0412", map: "0.912", when: "Oct 28, 14:32" },
  { name: "run-0419", map: "0.907", when: "Oct 27, 09:15" },
  { name: "run-0405", map: "0.899", when: "Oct 24, 18:02" },
];

/** Static links to the first pages and the last, with an ellipsis for the span between. */
export default function Default() {
  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border">
      <ul className="divide-y">
        {runs.map((run) => (
          <li key={run.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <span className="font-medium tabular-nums">{run.name}</span>
            <span className="text-muted-foreground tabular-nums">mAP {run.map}</span>
            <span className="text-muted-foreground tabular-nums">{run.when}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center gap-3 border-t p-3">
        <p className="text-muted-foreground tabular-nums">Showing 11–20 of 118 runs</p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="?page=1" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=1">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=2" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=3">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=12">12</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="?page=3" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
