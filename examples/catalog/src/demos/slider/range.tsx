import { Label, Slider } from "@robomous/ui-core";
import { useState } from "react";

/** Two values, two thumbs: the filled track between them is the selection. */
export default function Range() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-xl border p-5">
      <div className="flex items-baseline justify-between">
        <span className="flex flex-col gap-0.5">
          <Label id="charge-window-label">Charge window</Label>
          <span className="text-muted-foreground">Atlas, rb-07</span>
        </span>
        <span className="font-medium tabular-nums">
          {range[0]}–{range[1]}%
        </span>
      </div>
      <Slider
        aria-labelledby="charge-window-label"
        value={range}
        onValueChange={setRange}
        step={5}
        minStepsBetweenThumbs={2}
      />
      <p className="text-muted-foreground tabular-nums">
        Atlas docks below {range[0]}% and leaves the dock at {range[1]}%.
      </p>
    </div>
  );
}
