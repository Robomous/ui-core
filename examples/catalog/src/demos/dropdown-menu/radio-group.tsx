import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@robomous/ui-core";
import { FolderInputIcon } from "lucide-react";
import { useState } from "react";

/** One tab stop; the arrow keys move the selection inside the group, same as a RadioGroup. */
export default function RadioGroup() {
  const [destination, setDestination] = useState("review");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FolderInputIcon data-icon="inline-start" />
          Move to
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Destination</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={destination} onValueChange={setDestination}>
          <DropdownMenuRadioItem value="review">Review</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="archive">Archive</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="warehouse">Warehouse</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
