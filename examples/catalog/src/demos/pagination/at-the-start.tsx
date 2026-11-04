import {
  Badge,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@robomous/ui-core";

const deployments = [
  { site: "Monterrey DC-2", model: "detector-v3.2", status: "Live" },
  { site: "Guadalajara DC-1", model: "detector-v3.2", status: "Live" },
  { site: "Laredo Cross-dock", model: "segmenter-v1.4", status: "Canary" },
];

/** An anchor has no `disabled` attribute, so mute Previous by hand: `aria-disabled` and an inert, dimmed style. */
export default function AtTheStart() {
  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border">
      <ul className="divide-y">
        {deployments.map((item) => (
          <li key={item.site} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{item.site}</span>
              <span className="text-muted-foreground">{item.model}</span>
            </div>
            <Badge variant={item.status === "Live" ? "success" : "info"}>{item.status}</Badge>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center gap-3 border-t p-3">
        <p className="text-muted-foreground tabular-nums">Showing 1–10 of 28 deployments</p>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="?page=1"
                aria-disabled="true"
                tabIndex={-1}
                className="pointer-events-none opacity-50"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=1" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=2">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="?page=3">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="?page=2" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
