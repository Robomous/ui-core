import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@robomous/ui-core";
import { ChevronDownIcon, CopyIcon, PencilIcon } from "@robomous/ui-core/icons";

/** `inset` lines a label's or an item's leading edge up with the icons in the rows around it. */
export default function Inset() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Batch actions
          <ChevronDownIcon data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start">
        <DropdownMenuLabel inset>batch-0042</DropdownMenuLabel>
        <DropdownMenuItem>
          <PencilIcon />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyIcon />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem inset>View audit log</DropdownMenuItem>
        <DropdownMenuItem inset>Copy batch ID</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
