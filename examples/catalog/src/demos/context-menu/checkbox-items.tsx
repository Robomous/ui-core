import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@robomous/ui-core";
import { useState } from "react";

/** Checked, unchecked, and indeterminate — a class kept visible on some cameras but not all. */
export default function CheckboxItems() {
  const [hidden, setHidden] = useState(true);
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Right-click the frame
      </ContextMenuTrigger>
      <ContextMenuContent>
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
