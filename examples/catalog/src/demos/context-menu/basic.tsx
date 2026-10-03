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

/** The trigger is the area itself, not a button — right-click it to open the menu. */
export default function Basic() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex w-64 flex-col gap-2 rounded-lg border bg-card p-2 select-none">
        <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-muted-foreground">
          <ImageIcon className="size-6" />
        </div>
        <div className="flex items-center justify-between px-0.5 text-xs">
          <span className="font-mono">frame-000184.jpg</span>
          <span className="font-mono text-muted-foreground">412 KB</span>
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
  );
}
