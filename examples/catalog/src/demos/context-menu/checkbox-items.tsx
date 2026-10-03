import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@robomous/ui-core";
import { ImageIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** Checked, unchecked, and indeterminate — a class kept visible on some cameras but not all. */
export default function CheckboxItems() {
  const [hidden, setHidden] = useState(true);
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex w-64 flex-col gap-2 rounded-lg border bg-card p-2 select-none">
        <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-muted-foreground">
          <ImageIcon className="size-6" />
        </div>
        <div className="flex items-center justify-between px-0.5 text-xs">
          <span className="font-mono">warehouse-cam-04</span>
          <span className="font-mono text-muted-foreground">1920 × 1080</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-60">
        <ContextMenuLabel>View options</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={hidden} onCheckedChange={setHidden}>
          Show hidden frames
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked="indeterminate">
          Show annotations (2 of 3 classes)
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
