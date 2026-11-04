import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@robomous/ui-core";
import { RefreshCwIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

/** A dataset card with an image slot: the placeholder takes the exact shape of the content, so nothing moves when the data lands. */
export default function Overview() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Card className="w-full max-w-sm" aria-busy={loading}>
      <div className="p-(--card-spacing) pb-0">
        {loading ? (
          <Skeleton className="aspect-video w-full rounded-lg" />
        ) : (
          <img
            src="/assets/frames/dock.svg"
            alt="Loading dock A at Monterrey DC-2, pallets staged by the roll-up doors"
            className="aspect-video w-full rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
        )}
      </div>
      <CardHeader>
        {loading ? (
          <>
            <Skeleton className="h-4 w-36" />
            <Skeleton className="mt-1 h-3 w-52" />
          </>
        ) : (
          <>
            <CardTitle className="font-mono">pallet-detection</CardTitle>
            <CardDescription className="tabular-nums">
              18,204 frames · 41 batches · updated Oct 28
            </CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3">
        {loading ? (
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ) : (
          <div className="flex gap-1.5">
            <Badge variant="quiet">boxes</Badge>
            <Badge variant="quiet">5 classes</Badge>
          </div>
        )}
        <Button variant="outline" size="sm" disabled={loading} onClick={() => setLoading(true)}>
          <RefreshCwIcon data-icon="inline-start" />
          Reload
        </Button>
      </CardContent>
    </Card>
  );
}
