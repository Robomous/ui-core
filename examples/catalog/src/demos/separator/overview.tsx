import { Button, Separator } from "@robomous/ui-core";

/** A run summary: horizontal rules between its sections, vertical ones between the facts in the strip. */
export default function Overview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border p-4">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">detector-v3.2 · run 418</span>
        <span className="text-muted-foreground">Started 2h ago by María López</span>
      </div>
      <Separator />
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground">Epoch</span>
          <span className="tabular-nums">42 / 120</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground">mAP</span>
          <span className="tabular-nums">0.713</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground">GPU</span>
          <span className="tabular-nums">A100 · 87%</span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Pause
        </Button>
        <Button size="sm">Open run</Button>
      </div>
    </div>
  );
}
