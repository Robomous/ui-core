import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  toast,
} from "@robomous/ui-core";
import { CopyIcon, EyeIcon, ImageIcon, SendIcon, Trash2Icon } from "@robomous/ui-core/icons";

const frames = [
  { name: "frame-000184.jpg", detail: "dock-cam-02 · 6 boxes" },
  { name: "frame-000185.jpg", detail: "dock-cam-02 · 4 boxes" },
  { name: "frame-000731.jpg", detail: "aisle-cam-14 · 11 boxes" },
];

/** A review queue where every row carries its own menu: right-click it, or long-press on touch. */
export default function Overview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <p className="text-muted-foreground">Right-click a frame for its actions.</p>
      <ItemGroup className="gap-2">
        {frames.map((frame) => (
          <ContextMenu key={frame.name}>
            <ContextMenuTrigger asChild>
              <Item variant="outline" size="sm">
                <ItemMedia variant="icon">
                  <ImageIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="font-mono">{frame.name}</ItemTitle>
                  <ItemDescription>{frame.detail}</ItemDescription>
                </ItemContent>
              </Item>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuGroup>
                <ContextMenuItem>
                  <EyeIcon />
                  Open
                </ContextMenuItem>
                <ContextMenuItem onSelect={() => toast(`Copied link to ${frame.name}`)}>
                  <CopyIcon />
                  Copy link
                  <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <SendIcon />
                  Send to review
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <Trash2Icon />
                Delete frame
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </ItemGroup>
    </div>
  );
}
