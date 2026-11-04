import { Badge, Card, CardDescription, CardHeader, CardTitle, ScrollArea } from "@robomous/ui-core";

const checkpoints = Array.from({ length: 24 }, (_, index) => ({
  epoch: 24 - index,
  map: (0.71 - index * 0.012).toFixed(3),
}));

/** Size the root with `h-*`; the content grows as tall as it needs to and the viewport scrolls it. */
export default function VerticalList() {
  return (
    <Card className="w-full max-w-sm gap-3">
      <CardHeader>
        <CardTitle>Checkpoints</CardTitle>
        <CardDescription>detector-v3.2 · run-0412 · saved every epoch</CardDescription>
      </CardHeader>
      <ScrollArea className="mx-4 h-48 rounded-lg border">
        <div className="flex flex-col gap-1 p-2">
          {checkpoints.map(({ epoch, map }) => (
            <div
              key={epoch}
              className="flex h-8 items-center justify-between rounded-md px-2 text-xs"
            >
              <span className="font-mono">epoch-{String(epoch).padStart(3, "0")}.pt</span>
              <span className="flex items-center gap-2 text-muted-foreground tabular-nums">
                {epoch === 24 ? <Badge variant="success">best</Badge> : null}mAP {map}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
