import { ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { LayoutGridIcon, ListIcon, TableIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const frames = [
  { name: "frame-0417", boxes: 6, size: "2.1 MB", scene: "dock" },
  { name: "frame-0418", boxes: 4, size: "1.9 MB", scene: "floor" },
  { name: "frame-0419", boxes: 9, size: "2.4 MB", scene: "conveyor" },
];

const frameSrc = (scene: string) => `/assets/frames/${scene}.svg`;
const edge = "outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10";

/** `type="single"` keeps at most one segment pressed; pressing the active one turns it off again. */
export default function Single() {
  const [layout, setLayout] = useState("grid");

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border p-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">pallet-detection</span>
          <span className="text-muted-foreground tabular-nums">18,204 frames</span>
        </div>
        <ToggleGroup
          type="single"
          value={layout}
          onValueChange={setLayout}
          aria-label="Dataset layout"
        >
          <ToggleGroupItem value="grid" aria-label="Grid">
            <LayoutGridIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List">
            <ListIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="table" aria-label="Table">
            <TableIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {layout === "grid" ? (
        <div className="grid grid-cols-3 gap-2">
          {frames.map((frame) => (
            <div key={frame.name} className="flex flex-col gap-1">
              <img
                src={frameSrc(frame.scene)}
                alt=""
                loading="lazy"
                className={`aspect-video w-full rounded-md object-cover ${edge}`}
              />
              <span className="truncate tabular-nums">{frame.name}</span>
            </div>
          ))}
        </div>
      ) : null}
      {layout === "list" ? (
        <ul className="flex flex-col gap-2">
          {frames.map((frame) => (
            <li key={frame.name} className="flex items-center gap-3">
              <img
                src={frameSrc(frame.scene)}
                alt=""
                loading="lazy"
                className={`h-8 w-14 shrink-0 rounded-md object-cover ${edge}`}
              />
              <span className="flex-1 tabular-nums">{frame.name}</span>
              <span className="text-muted-foreground tabular-nums">{frame.boxes} boxes</span>
            </li>
          ))}
        </ul>
      ) : null}
      {layout === "table" ? (
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-1.5 tabular-nums">
          <span className="text-muted-foreground">Frame</span>
          <span className="text-muted-foreground">Boxes</span>
          <span className="text-muted-foreground">Size</span>
          {frames.map((frame) => (
            <div key={frame.name} className="contents">
              <span>{frame.name}</span>
              <span>{frame.boxes}</span>
              <span>{frame.size}</span>
            </div>
          ))}
        </div>
      ) : null}
      {layout === "" ? <p className="text-muted-foreground">No layout selected.</p> : null}
    </div>
  );
}
