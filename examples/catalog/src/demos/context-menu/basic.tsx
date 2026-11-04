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
import { CopyIcon, DownloadIcon, ImageIcon, Trash2Icon } from "@robomous/ui-core/icons";

/** The trigger is the area itself, not a button: right-click the tile and the menu opens at the pointer. */
export default function Basic() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <ContextMenu>
        <ContextMenuTrigger className="flex flex-col gap-2 rounded-lg border p-2 select-none">
          <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-muted-foreground">
            <ImageIcon className="size-6" />
          </div>
          <div className="flex items-center justify-between px-0.5 text-xs">
            <span className="font-mono">frame-000184.jpg</span>
            <span className="text-muted-foreground tabular-nums">412 KB</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuLabel>frame-000184.jpg</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>
              <CopyIcon />
              Copy link
              <ContextMenuShortcut>⌘C</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              <DownloadIcon />
              Download
              <ContextMenuShortcut>⌘S</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <Trash2Icon />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <span className="text-center text-muted-foreground">Right-click the frame</span>
    </div>
  );
}
