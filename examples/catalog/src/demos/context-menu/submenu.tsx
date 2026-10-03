import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@robomous/ui-core";
import { FileArchiveIcon, FolderInputIcon, PencilIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** A submenu holding a radio group: one destination, chosen without leaving the row it opened from. */
export default function Submenu() {
  const [destination, setDestination] = useState("review");
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex w-64 flex-col gap-2 rounded-lg border bg-card p-2 select-none">
        <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-muted-foreground">
          <FileArchiveIcon className="size-6" />
        </div>
        <div className="flex items-center justify-between px-0.5 text-xs">
          <span className="font-mono">batch-0042.zip</span>
          <span className="font-mono text-muted-foreground">1.8 GB</span>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>
          <PencilIcon />
          Rename
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FolderInputIcon />
            Move to
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuRadioGroup value={destination} onValueChange={setDestination}>
              <ContextMenuRadioItem value="review">Review queue</ContextMenuRadioItem>
              <ContextMenuRadioItem value="archive">Archive</ContextMenuRadioItem>
              <ContextMenuRadioItem value="warehouse">Warehouse</ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}
