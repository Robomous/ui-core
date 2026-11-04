import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@robomous/ui-core";

/** With no known page count, offer only the two directions, and name them for what they hold. */
export default function PrevNext() {
  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
        <span className="font-medium">run-0412 · training log</span>
        <span className="text-muted-foreground tabular-nums">lines 201–300</span>
      </div>
      <pre className="overflow-hidden px-4 py-3 font-mono text-[0.6875rem] leading-relaxed text-muted-foreground tabular-nums">
        {`Oct 28 14:32:07  epoch 35  loss 0.251  mAP 0.899
Oct 28 14:35:41  epoch 36  loss 0.248  mAP 0.904
Oct 28 14:39:12  epoch 37  loss 0.244  mAP 0.909
Oct 28 14:42:48  epoch 38  loss 0.241  mAP 0.912`}
      </pre>
      <Pagination className="border-t px-3 py-2">
        <PaginationContent className="w-full justify-between">
          <PaginationItem>
            <PaginationPrevious href="?before=201" text="Newer" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="?after=300" text="Older" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
