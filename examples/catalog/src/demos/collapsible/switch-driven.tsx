import { Collapsible, CollapsibleContent, Input, Label, Switch } from "@robomous/ui-core";
import { useState } from "react";

/** Controlled with `open`, so any control can drive it: here a Switch reveals the fields it enables. */
export default function SwitchDriven() {
  const [scheduled, setScheduled] = useState(false);

  return (
    <Collapsible
      open={scheduled}
      onOpenChange={setScheduled}
      className="flex w-full max-w-sm flex-col gap-4 rounded-lg border p-4"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <Label htmlFor="retrain">Scheduled retraining</Label>
          <span className="text-muted-foreground">
            Retrain detector-v3.2 on new annotations from pallet-detection.
          </span>
        </div>
        <Switch id="retrain" checked={scheduled} onCheckedChange={setScheduled} />
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <Label htmlFor="cron">Cron expression</Label>
        <Input id="cron" defaultValue="0 3 * * 0" className="font-mono" />
        <span className="text-muted-foreground">Every Sunday at 03:00 UTC.</span>
      </CollapsibleContent>
    </Collapsible>
  );
}
