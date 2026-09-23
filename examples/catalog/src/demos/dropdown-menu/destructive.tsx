import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@robomous/ui-core";
import { Trash2Icon } from "@robomous/ui-core/icons";

/** `variant="destructive"` recolours the text and its icon before focus even lands. */
export default function Destructive() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Batch actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2Icon />
          Delete batch
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
