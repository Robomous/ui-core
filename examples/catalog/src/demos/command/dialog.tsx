import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Kbd,
  KbdGroup,
} from "@robomous/ui-core";
import { FileIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

/** Opened from a button or Cmd/Ctrl+K; its title and description are sr-only, naming the dialog with no visible heading. */
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

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open the palette
        <KbdGroup data-icon="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
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
            <CommandGroup heading="Ingest">
              <CommandItem value="upload" onSelect={() => setOpen(false)}>
                <PlusIcon />
                Upload a batch
              </CommandItem>
              <CommandItem value="import" onSelect={() => setOpen(false)}>
                <FileIcon />
                Import from URL
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
