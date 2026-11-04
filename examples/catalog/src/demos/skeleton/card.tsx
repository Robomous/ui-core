import { Card, CardContent, Skeleton } from "@robomous/ui-core";

/** A card-shaped placeholder: a camera frame above a title, a meta line and two status pills. */
export default function CardSkeleton() {
  return (
    <Card className="w-full max-w-xs" aria-busy="true">
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
