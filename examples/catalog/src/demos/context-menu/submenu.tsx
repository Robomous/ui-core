import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@robomous/ui-core";
import { useState } from "react";

/** A submenu holding a radio group: one destination, chosen without leaving the row it opened from. */
export default function Submenu() {
  const [destination, setDestination] = useState("review");
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Right-click batch-0042.zip
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuRadioGroup value={destination} onValueChange={setDestination}>
              <ContextMenuRadioItem value="review">Review</ContextMenuRadioItem>
              <ContextMenuRadioItem value="archive">Archive</ContextMenuRadioItem>
              <ContextMenuRadioItem value="warehouse">Warehouse</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
