import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@robomous/ui-core";
import { FileIcon, PlusIcon, SettingsIcon } from "lucide-react";

/** A listbox driven from the field above it: type to filter, arrows to move, Enter to choose. */
export default function Inline() {
  return (
    <Command className="w-72 ring-1 ring-foreground/10">
      <CommandInput placeholder="Search a command" aria-label="Search a command" />
      <CommandList>
        <CommandEmpty>Nothing matches.</CommandEmpty>
        <CommandGroup heading="Ingest">
          <CommandItem value="upload">
            <PlusIcon />
            Upload a batch
            <CommandShortcut>⌘U</CommandShortcut>
          </CommandItem>
          <CommandItem value="import">
            <FileIcon />
            Import from URL
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Schema">
          <CommandItem value="classes">
            <SettingsIcon />
            Edit classes
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
