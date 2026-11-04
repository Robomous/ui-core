import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  Kbd,
  KbdGroup,
} from "@robomous/ui-core";
import {
  BrainIcon,
  DatabaseIcon,
  HomeIcon,
  KeyRoundIcon,
  PlusIcon,
  SearchIcon,
  UserPlusIcon,
} from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

const FRAMES = [
  { src: "/assets/frames/dock.svg", alt: "Loading dock A with staged pallets and two workers" },
  {
    src: "/assets/frames/dock-2.svg",
    alt: "Loading dock A from another angle, with a pallet jack and a blue crate",
  },
  {
    src: "/assets/frames/floor.svg",
    alt: "Overhead view of storage bays B11 and B12 with pallet slots and a forklift",
  },
];

/** Opened from a button or Cmd/Ctrl+K; its title and description are `sr-only`, naming the dialog with no visible heading. */
export default function Dialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = () => setOpen(false);

  return (
    <>
      <div className="flex w-full max-w-lg flex-col overflow-hidden rounded-xl border">
        <div className="flex items-center justify-between gap-4 border-b p-3">
          <div className="flex min-w-0 flex-col">
            <span className="font-medium">pallet-detection</span>
            <span className="text-muted-foreground tabular-nums">18,204 frames · 41 batches</span>
          </div>
          <Button
            variant="outline"
            className="w-56 justify-start text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            <SearchIcon data-icon="inline-start" />
            Search or run a command
            <KbdGroup data-icon="inline-end" className="ml-auto">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 bg-muted/40 p-3">
          {FRAMES.map((frame) => (
            <img
              key={frame.src}
              src={frame.src}
              alt={frame.alt}
              loading="lazy"
              className="aspect-[8/5] w-full rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
          ))}
        </div>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command palette"
        description="Search for a command to run."
      >
        <Command>
          <CommandInput placeholder="Search a command" aria-label="Search a command" />
          <CommandList>
            <CommandEmpty>Nothing matches.</CommandEmpty>
            <CommandGroup heading="Create">
              <CommandItem value="new dataset" onSelect={run}>
                <PlusIcon />
                New dataset
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem value="start training run" onSelect={run}>
                <BrainIcon />
                Start a training run
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Go to">
              <CommandItem value="open forklift-night" onSelect={run}>
                <DatabaseIcon />
                forklift-night
              </CommandItem>
              <CommandItem value="monterrey dc-2 fleet" onSelect={run}>
                <HomeIcon />
                Monterrey DC-2 fleet
              </CommandItem>
              <CommandItem value="api keys" onSelect={run}>
                <KeyRoundIcon />
                API keys
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Team">
              <CommandItem value="invite member" onSelect={run}>
                <UserPlusIcon />
                Invite a member
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
