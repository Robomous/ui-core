import { cn, ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { BoxIcon, ScanIcon, TagIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const detections = [
  { label: "pallet 0.94", box: { left: 26.9, top: 41.4, width: 13.1, height: 27.3 } },
  { label: "person 0.92", box: { left: 42.6, top: 45.6, width: 6.7, height: 29.3 } },
  { label: "pallet jack 0.89", box: { left: 57.2, top: 52.8, width: 15.5, height: 42.4 } },
];

/** `type="multiple"` keeps each segment independent, and its value is an array of the ones that are on. */
export default function Multiple() {
  const [layers, setLayers] = useState(["boxes", "labels"]);
  const has = (layer: string) => layers.includes(layer);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border p-2">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/dock-2.svg"
          alt="Camera frame of loading dock A with pallets, a pallet jack and a worker"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        {detections.map(({ label, box }) => (
          <div
            key={label}
            style={{
              left: `${box.left}%`,
              top: `${box.top}%`,
              width: `${box.width}%`,
              height: `${box.height}%`,
            }}
            className={cn(
              "absolute rounded-sm border-2 transition-colors",
              has("boxes") ? "border-info" : "border-transparent",
              has("masks") && "bg-info/30",
            )}
          >
            {has("labels") ? (
              <span className="absolute -top-px left-0 -translate-y-full rounded-t-sm bg-info px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
                {label}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <ToggleGroup
        type="multiple"
        variant="outline"
        value={layers}
        onValueChange={setLayers}
        aria-label="Frame overlays"
        className="self-center"
      >
        <ToggleGroupItem value="boxes">
          <BoxIcon data-icon="inline-start" />
          Boxes
        </ToggleGroupItem>
        <ToggleGroupItem value="masks">
          <ScanIcon data-icon="inline-start" />
          Masks
        </ToggleGroupItem>
        <ToggleGroupItem value="labels">
          <TagIcon data-icon="inline-start" />
          Labels
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
