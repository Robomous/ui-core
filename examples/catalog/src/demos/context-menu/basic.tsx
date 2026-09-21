import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@robomous/ui-core";
import { CopyIcon, Trash2Icon } from "lucide-react";

/** The trigger is the area itself, not a button — right-click it to open the menu. */
export default function Basic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
        Right-click batch-0042.zip
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>batch-0042.zip</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            <CopyIcon />
            Copy link
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash2Icon />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
