import { ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { useState } from "react";

const latency = {
  "1h": { p95: 38, bars: [34, 36, 35, 38, 37, 36, 38, 35] },
  "24h": { p95: 41, bars: [36, 39, 41, 40, 44, 41, 38, 40] },
  "7d": { p95: 44, bars: [40, 43, 45, 42, 46, 44, 47, 43] },
  "30d": { p95: 47, bars: [42, 45, 49, 46, 44, 50, 48, 47] },
} as const;
type Range = keyof typeof latency;

/** `spacing={0}` welds the segments into one control with shared borders; the ends take the group's radius. */
export default function Welded() {
  const [range, setRange] = useState<Range>("24h");
  const { p95, bars } = latency[range];

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium">Inference latency</span>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          spacing={0}
          value={range}
          onValueChange={(next) => {
            if (next) setRange(next as Range);
          }}
          aria-label="Metric range"
        >
          {(Object.keys(latency) as Range[]).map((value) => (
            <ToggleGroupItem key={value} value={value}>
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-baseline gap-2 tabular-nums">
          <span className="text-2xl font-medium">{p95} ms</span>
          <span className="text-muted-foreground">p95, last {range}</span>
        </div>
        <div className="flex h-10 items-end gap-1" aria-hidden>
          {bars.map((value, index) => (
            <div
              key={index}
              className="w-1.5 rounded-sm bg-muted-foreground/40 transition-[height]"
              style={{ height: `${(value / 52) * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
