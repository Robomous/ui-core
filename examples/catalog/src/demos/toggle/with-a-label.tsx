import { cn, Toggle } from "@robomous/ui-core";
import { EyeIcon, RouteIcon, TagIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const tones = {
  info: { border: "border-info", fill: "bg-info/30", chip: "bg-info" },
  success: { border: "border-success", fill: "bg-success/30", chip: "bg-success" },
  warning: { border: "border-warning", fill: "bg-warning/30", chip: "bg-warning" },
};

const detections = [
  {
    label: "pallet 0.94",
    tone: tones.info,
    box: { left: 12.9, top: 42.6, width: 15.1, height: 29 },
  },
  {
    label: "person 0.91",
    tone: tones.success,
    box: { left: 31.2, top: 46.2, width: 6.9, height: 30.1 },
  },
  {
    label: "pallet jack 0.88",
    tone: tones.warning,
    box: { left: 46.2, top: 52.4, width: 14.5, height: 40.6 },
  },
];

/** An icon and a word read as one control; `data-icon` pads the icon the way it does on a Button. */
export default function WithALabel() {
  const [masks, setMasks] = useState(true);
  const [labels, setLabels] = useState(false);
  const [tracks, setTracks] = useState(true);

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border p-2">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/dock.svg"
          alt="Camera frame of loading dock A with pallets, a pallet jack and two workers"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        {detections.map(({ label, tone, box }) => (
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
              tone.border,
              masks ? tone.fill : "bg-transparent",
            )}
          >
            {labels ? (
              <span
                className={cn(
                  "absolute -top-px left-0 -translate-y-full rounded-t-sm px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums",
                  tone.chip,
                )}
              >
                {label}
              </span>
            ) : null}
          </div>
        ))}
        {tracks ? (
          <svg viewBox="0 0 160 90" className="absolute inset-0 size-full" aria-hidden>
            <polyline
              points="34,70 42,69.5 49,69.2 55,68.8"
              fill="none"
              strokeWidth={1.5}
              strokeDasharray="3 2"
              className="stroke-success"
            />
          </svg>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 px-1 pb-1">
        <div className="flex items-center gap-2">
          <Toggle variant="outline" pressed={masks} onPressedChange={setMasks}>
            <EyeIcon data-icon="inline-start" />
            Masks
          </Toggle>
          <Toggle variant="outline" pressed={labels} onPressedChange={setLabels}>
            <TagIcon data-icon="inline-start" />
            Labels
          </Toggle>
          <Toggle variant="outline" pressed={tracks} onPressedChange={setTracks}>
            <RouteIcon data-icon="inline-start" />
            Tracks
          </Toggle>
        </div>
        <span className="text-muted-foreground">Viewer overlays. Each one flips on its own.</span>
      </div>
    </div>
  );
}
