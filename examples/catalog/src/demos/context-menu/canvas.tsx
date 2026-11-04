import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@robomous/ui-core";
import { BoxIcon, EraserIcon } from "@robomous/ui-core/icons";
import { useRef, useState } from "react";

/** The menu opens where the pointer was, so the trigger records that point first and the item reads it back. */
export default function Canvas() {
  const [boxes, setBoxes] = useState<{ id: number; x: number; y: number }[]>([]);
  const point = useRef({ x: 0, y: 0 });

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <ContextMenu>
        <ContextMenuTrigger
          className="relative aspect-video overflow-hidden rounded-lg border bg-muted"
          onContextMenu={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            point.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
          }}
        >
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-muted-foreground">
            Right-click to annotate
          </span>
          {boxes.map((box) => (
            <span
              key={box.id}
              className="pointer-events-none absolute size-12 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2 border-primary bg-primary/10"
              style={{ left: box.x, top: box.y }}
            />
          ))}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuItem
            onSelect={() =>
              setBoxes((current) => [
                ...current,
                { id: (current.at(-1)?.id ?? 0) + 1, ...point.current },
              ])
            }
          >
            <BoxIcon />
            Add bounding box here
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem disabled={boxes.length === 0} onSelect={() => setBoxes([])}>
            <EraserIcon />
            Clear all boxes
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <span className="text-muted-foreground tabular-nums">{boxes.length} boxes on this frame</span>
    </div>
  );
}
