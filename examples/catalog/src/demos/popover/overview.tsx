import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Slider,
  Switch,
} from "@robomous/ui-core";
import { SlidersHorizontalIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

// Position and size are percentages of the frame, so the boxes follow it at any width.
const detections = [
  { confidence: 0.96, left: 13.7, top: 36.9, width: 12.2, height: 21.6 },
  { confidence: 0.94, left: 50.5, top: 17.2, width: 14.1, height: 25 },
  { confidence: 0.91, left: 33.7, top: 32.6, width: 8.8, height: 15.6 },
  { confidence: 0.88, left: 69.2, top: 9.3, width: 13, height: 23 },
  { confidence: 0.82, left: 23.6, top: 75.7, width: 9.2, height: 16.4 },
  { confidence: 0.74, left: 42.7, top: 67.3, width: 9.1, height: 16 },
  { confidence: 0.63, left: 62.8, top: 60.3, width: 9.1, height: 16.1 },
  { confidence: 0.55, left: 76.3, top: 54.8, width: 9.1, height: 16.1 },
  { confidence: 0.41, left: 10.9, top: 83.9, width: 8.8, height: 15.7 },
];

/** A viewer toolbar: the setting opens in place, applies live and closes by clicking away. */
export default function Overview() {
  const [threshold, setThreshold] = useState(50);
  const [labels, setLabels] = useState(true);
  const visible = detections.filter((box) => box.confidence >= threshold / 100);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-2 py-2.5 pr-2.5 pl-4">
        <div className="flex flex-col">
          <span className="font-mono text-sm font-medium">detector-v3.2</span>
          <span className="text-muted-foreground tabular-nums">
            {visible.length} detections in this frame
          </span>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontalIcon data-icon="inline-start" />
              <span className="tabular-nums">Confidence {(threshold / 100).toFixed(2)}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-72">
            <PopoverHeader>
              <PopoverTitle>Detections</PopoverTitle>
              <PopoverDescription>Hide boxes below the confidence threshold.</PopoverDescription>
            </PopoverHeader>
            <Slider
              aria-label="Confidence threshold"
              value={[threshold]}
              onValueChange={([next]) => setThreshold(next)}
              step={5}
            />
            <div className="flex items-center justify-between">
              <Label htmlFor="pop-overview-labels">Show labels</Label>
              <Switch id="pop-overview-labels" checked={labels} onCheckedChange={setLabels} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="relative aspect-video border-t">
        <img
          src="/assets/frames/conveyor.svg"
          alt="Overhead frame of two sorting belts carrying parcels under a scanner gantry"
          className="size-full object-cover"
        />
        {visible.map((box) => (
          <span
            key={`${box.left}-${box.top}`}
            className="absolute rounded-sm border-2 border-info"
            style={{
              left: `${box.left}%`,
              top: `${box.top}%`,
              width: `${box.width}%`,
              height: `${box.height}%`,
            }}
          >
            {labels && (
              <span className="absolute -top-5 -left-0.5 rounded-xs bg-info px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
                parcel {box.confidence.toFixed(2)}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
