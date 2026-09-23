import { Label, Slider } from "@robomous/ui-core";
import { useState } from "react";

/** Two values, two thumbs: the range between them is the selection. */
export default function Range() {
  const [range, setRange] = useState([20, 80]);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between">
        <Label id="score-range-label">Score range</Label>
        <span className="font-mono text-sm text-muted-foreground tabular-nums">
          {range[0]}–{range[1]}
        </span>
      </div>
      <Slider aria-labelledby="score-range-label" value={range} onValueChange={setRange} />
    </div>
  );
}
