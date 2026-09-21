import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@robomous/ui-core";
import { CopyIcon, PencilIcon, Trash2Icon } from "lucide-react";

/** `inset` lines a label's or an item's leading edge up with the icons in the rows around it. */
export default function Inset() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Batch actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel inset>batch-0042</DropdownMenuLabel>
        <DropdownMenuItem inset>
          <PencilIcon />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem inset>
          <CopyIcon />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem inset variant="destructive">
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
