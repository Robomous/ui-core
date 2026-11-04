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
import { BotIcon, MapPinIcon, PencilIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** A submenu holding a radio group: one zone, chosen without leaving the card the menu opened from. */
export default function Submenu() {
  const [destination, setDestination] = useState("dock-b");
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <ContextMenu>
        <ContextMenuTrigger className="flex flex-col gap-2 rounded-lg border p-2 select-none">
          <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-muted-foreground">
            <BotIcon className="size-6" />
          </div>
          <div className="flex items-center justify-between px-0.5 text-xs">
            <span className="font-mono">rb-12</span>
            <span className="text-muted-foreground">Nova · Dock B</span>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-52">
          <ContextMenuItem>
            <PencilIcon />
            Rename
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <MapPinIcon />
              Reassign zone
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuRadioGroup value={destination} onValueChange={setDestination}>
                <ContextMenuRadioItem value="aisle-14">Aisle 14</ContextMenuRadioItem>
                <ContextMenuRadioItem value="dock-b">Dock B</ContextMenuRadioItem>
                <ContextMenuRadioItem value="charging-bay">Charging bay</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
      <span className="text-center text-muted-foreground">Right-click the robot</span>
    </div>
  );
}
