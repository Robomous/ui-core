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
import {
  DatabaseIcon,
  HomeIcon,
  PlusIcon,
  RocketIcon,
  SettingsIcon,
} from "@robomous/ui-core/icons";

/** A menu of actions: icons say what kind, `CommandShortcut` shows the key, and `disabled` dims what is unavailable. */
export default function Inline() {
  return (
    <Command className="w-full max-w-sm ring-1 ring-foreground/10">
      <CommandInput placeholder="Search a command" aria-label="Search a command" />
      <CommandList>
        <CommandEmpty>Nothing matches.</CommandEmpty>
        <CommandGroup heading="Datasets">
          <CommandItem value="new dataset">
            <PlusIcon />
            New dataset
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="open pallet-detection">
            <DatabaseIcon />
            Open pallet-detection
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Fleet">
          <CommandItem value="send rb-07 to dock">
            <HomeIcon />
            Send rb-07 Atlas to dock
          </CommandItem>
          <CommandItem value="edit zones">
            <SettingsIcon />
            Edit zones at Monterrey DC-2
            <CommandShortcut>⌘E</CommandShortcut>
          </CommandItem>
          <CommandItem value="deploy detector-v3.3" disabled>
            <RocketIcon />
            Deploy detector-v3.3 (needs approval)
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
