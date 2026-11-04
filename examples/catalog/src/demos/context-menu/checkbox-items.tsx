import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@robomous/ui-core";
import { VideoIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** Checkbox items for view options; indeterminate says an overlay is on for some zones, not all. */
export default function CheckboxItems() {
  const [timestamp, setTimestamp] = useState(true);
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <ContextMenu>
        <ContextMenuTrigger className="flex flex-col gap-2 rounded-lg border p-2 select-none">
          <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-muted-foreground">
            <VideoIcon className="size-6" />
          </div>
          <div className="flex items-center justify-between px-0.5 text-xs">
            <span className="font-mono">dock-cam-02</span>
            <span className="text-muted-foreground">Monterrey DC-2</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-60">
          <ContextMenuLabel>Feed overlays</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={timestamp} onCheckedChange={setTimestamp}>
            Show timestamp
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked="indeterminate">
            Show zone overlays (2 of 3 zones)
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
      <span className="text-center text-muted-foreground">Right-click the feed</span>
    </div>
  );
}
