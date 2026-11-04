import { Badge, cn, ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { HandIcon, MousePointer2Icon, RulerIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const hints: Record<string, string> = {
  select: "Click a dock to inspect it",
  pan: "Drag to move the map",
  measure: "Click two points to measure",
};

/** `orientation="vertical"` stacks the segments into a slim tool rail, stretched to one width. */
export default function Vertical() {
  const [tool, setTool] = useState("select");

  return (
    <div className="w-full max-w-sm rounded-xl border p-2">
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-lg bg-muted",
          tool === "select" && "cursor-default",
          tool === "pan" && "cursor-grab",
          tool === "measure" && "cursor-crosshair",
        )}
      >
        <img
          src="/assets/frames/yard.svg"
          alt="Overhead view of the truck yard with trailers backed into dock doors D01 to D12"
          className={cn(
            "size-full origin-left object-cover outline outline-1 -outline-offset-1 outline-black/10 transition-transform duration-300 dark:outline-white/10",
            tool === "pan" && "scale-125",
          )}
        />
        {tool === "select" ? (
          <div className="absolute top-[20.6%] left-[53%] h-[36.7%] w-[4.1%] rounded-sm border-2 border-info">
            <span className="absolute -top-px left-0 -translate-y-full rounded-t-sm bg-info px-1 text-[0.625rem] whitespace-nowrap text-background tabular-nums">
              D05 · trailer
            </span>
          </div>
        ) : null}
        {tool === "measure" ? (
          <>
            <svg viewBox="0 0 160 90" className="absolute inset-0 size-full" aria-hidden>
              <line
                x1="11.3"
                y1="62"
                x2="24.1"
                y2="62"
                strokeWidth={1.5}
                strokeDasharray="3 2"
                className="stroke-info"
              />
              <circle cx="11.3" cy="62" r="1.5" className="fill-info" />
              <circle cx="24.1" cy="62" r="1.5" className="fill-info" />
            </svg>
            <span className="absolute top-[71%] left-[10%] rounded-xs bg-info px-1 text-[0.625rem] text-background tabular-nums">
              4.2 m
            </span>
          </>
        ) : null}
        <ToggleGroup
          type="single"
          orientation="vertical"
          value={tool}
          onValueChange={(next) => {
            if (next) setTool(next);
          }}
          aria-label="Map tool"
          className="absolute top-2 left-2 w-9 rounded-lg border bg-background p-0.5 shadow-xs"
        >
          <ToggleGroupItem value="select" aria-label="Select">
            <MousePointer2Icon />
          </ToggleGroupItem>
          <ToggleGroupItem value="pan" aria-label="Pan">
            <HandIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="measure" aria-label="Measure">
            <RulerIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <Badge variant="secondary" className="absolute bottom-2 left-2">
          Querétaro Hub · {hints[tool]}
        </Badge>
      </div>
    </div>
  );
}
