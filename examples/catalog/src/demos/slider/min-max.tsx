import { Label, Slider } from "@robomous/ui-core";
import { useState } from "react";

/** `min`, `max` and `step` bound the track; labelling the ends says what the extremes cost. */
export default function MinMax() {
  const [fps, setFps] = useState([10]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <Label id="sampling-rate-label">Frame sampling</Label>
        <span className="font-medium tabular-nums">{fps[0]} fps</span>
      </div>
      <Slider
        aria-labelledby="sampling-rate-label"
        value={fps}
        onValueChange={setFps}
        min={1}
        max={30}
        step={1}
      />
      <div className="flex justify-between text-muted-foreground">
        <span>1 fps, smaller dataset</span>
        <span>30 fps, every frame</span>
      </div>
      <p className="border-t pt-3 text-muted-foreground tabular-nums">
        cam-b07 at Dock A adds about {(fps[0] * 3600).toLocaleString("en-US")} frames per hour to
        pallet-detection.
      </p>
    </div>
  );
}
