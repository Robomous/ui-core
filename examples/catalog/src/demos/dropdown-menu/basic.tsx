import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@robomous/ui-core";

/** Label over a group, a separator, and a shortcut hint — the everyday anatomy. */
export default function Basic() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Batch actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>batch-0042</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Rename
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
