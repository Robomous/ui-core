import { Skeleton } from "@robomous/ui-core";

/** A paragraph: full lines with a shorter last one, so the block reads as text and not as a bar. */
export default function Paragraph() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border p-4" aria-busy="true">
      <Skeleton className="h-5 w-2/5" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    </div>
  );
}
