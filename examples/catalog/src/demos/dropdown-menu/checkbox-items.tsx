import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@robomous/ui-core";
import { SlidersHorizontalIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** Checked, unchecked, and indeterminate — a class visible on some cameras but not all wears a dash, not a tick. */
export default function CheckboxItems() {
  const [vehicle, setVehicle] = useState(true);
  const [pedestrian, setPedestrian] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Visible classes">
          <SlidersHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Visible classes</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={vehicle} onCheckedChange={setVehicle}>
          Vehicle
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={pedestrian} onCheckedChange={setPedestrian}>
          Pedestrian
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked="indeterminate">
          Cyclist (2 of 3 cameras)
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
