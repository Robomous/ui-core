import { ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import {
  MapPinIcon,
  PentagonIcon,
  SquareDashedIcon,
  type LucideIcon,
} from "@robomous/ui-core/icons";
import { useState } from "react";

const tools: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: "box", label: "Box", Icon: SquareDashedIcon },
  { value: "polygon", label: "Polygon", Icon: PentagonIcon },
  { value: "point", label: "Point", Icon: MapPinIcon },
];

/** An annotation tool picker: exactly one tool is active, so a press on the active one is ignored. */
export default function Overview() {
  const [tool, setTool] = useState("box");

  return (
    <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border p-2">
      <div className="flex items-center justify-between gap-3">
        <ToggleGroup
          type="single"
          variant="outline"
          value={tool}
          onValueChange={(next) => {
            if (next) setTool(next);
          }}
          aria-label="Annotation tool"
        >
          {tools.map(({ value, label, Icon }) => (
            <ToggleGroupItem key={value} value={value}>
              <Icon data-icon="inline-start" />
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <span className="pr-1 text-muted-foreground tabular-nums">frame-0142</span>
      </div>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img
          src="/assets/frames/dock.svg"
          alt="Camera frame of loading dock A with staged pallets and two workers"
          className="size-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <svg
          viewBox="0 0 160 90"
          className="absolute inset-0 size-full fill-info/25 stroke-info"
          strokeWidth={1.5}
          aria-hidden
        >
          {tool === "box" ? <rect x="20.6" y="38.3" width="24.2" height="26.1" rx="1" /> : null}
          {tool === "polygon" ? (
            <polygon points="21,64.4 22.5,44 31,38.3 44.5,42 43.5,64.4" />
          ) : null}
          {tool === "point" ? <circle cx="32.7" cy="51.4" r="2.5" className="fill-info" /> : null}
        </svg>
      </div>
    </div>
  );
}
