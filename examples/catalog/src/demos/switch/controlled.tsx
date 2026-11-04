import { Badge, Label, Separator, Switch } from "@robomous/ui-core";
import { useState } from "react";

/** Control the switch with `checked` and `onCheckedChange` when something else on screen follows it. */
export default function Controlled() {
  const [live, setLive] = useState(true);

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border">
      <div className="relative aspect-video bg-muted">
        <img
          src="/assets/frames/dock.svg"
          alt="Loading dock A with two workers and staged pallets"
          className={`size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 transition-[opacity,filter] dark:outline-white/10 ${live ? "" : "opacity-50 grayscale"}`}
        />
        <Badge variant={live ? "success" : "quiet"} className="absolute top-3 left-3 shadow-xs">
          {live ? "Live · 10 fps" : "Stream paused"}
        </Badge>
      </div>
      <Separator />
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Dock A</span>
          <span className="font-mono text-muted-foreground">cam-b07 · Monterrey DC-2</span>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="stream-live">Live stream</Label>
          <Switch id="stream-live" checked={live} onCheckedChange={setLive} />
        </div>
      </div>
    </div>
  );
}
