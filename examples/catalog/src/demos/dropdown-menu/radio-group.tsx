import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@robomous/ui-core";
import { BotIcon, MapPinIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const zones: Record<string, string> = {
  "aisle-14": "Aisle 14",
  "dock-b": "Dock B",
  "charging-bay": "Charging bay",
};

/** One choice from a few: the check marks the current value and the arrow keys move between rows. */
export default function RadioGroup() {
  const [zone, setZone] = useState("aisle-14");
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="icon">
        <BotIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <span className="font-mono">rb-07</span> Atlas
        </ItemTitle>
        <ItemDescription>{zones[zone]}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MapPinIcon data-icon="inline-start" />
              Assign zone
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuLabel>rb-07 "Atlas"</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={zone} onValueChange={setZone}>
              <DropdownMenuRadioItem value="aisle-14">Aisle 14</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dock-b">Dock B</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="charging-bay">Charging bay</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}
