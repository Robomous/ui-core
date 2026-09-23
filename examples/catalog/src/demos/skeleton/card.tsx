import { Skeleton } from "@robomous/ui-core";

/** A card-shaped placeholder: a frame preview above two caption lines. */
export default function Card() {
  return (
    <div className="flex w-56 flex-col gap-2">
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
