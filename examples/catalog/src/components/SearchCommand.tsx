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
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Entry {
  title: string;
  href: string;
  description: string;
  group: string;
}

/**
 * Search over the page index (`/search.json`, built from the content
 * collections): a Command palette opened from the header or with Cmd/Ctrl+K.
 */
export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[] | null>(null);

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

  useEffect(() => {
    if (!open || entries !== null) return;
    fetch("/search.json")
      .then((response) => response.json() as Promise<Entry[]>)
      .then(setEntries)
      .catch(() => setEntries([]));
  }, [open, entries]);

  const groups = new Map<string, Entry[]>();
  for (const entry of entries ?? []) {
    groups.set(entry.group, [...(groups.get(entry.group) ?? []), entry]);
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="justify-start font-normal text-muted-foreground sm:w-64"
        onClick={() => setOpen(true)}
      >
        <SearchIcon data-icon="inline-start" />
        <span className="hidden sm:inline">Search documentation…</span>
        <span className="sm:hidden">Search</span>
        <KbdGroup className="ml-auto hidden sm:inline-flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Type to filter the pages; Enter opens the selected one."
      >
        <Command>
          <CommandInput placeholder="Search documentation…" />
          <CommandList>
            <CommandEmpty>{entries === null ? "Loading…" : "No page matches."}</CommandEmpty>
            {[...groups].map(([group, items]) => (
              <CommandGroup key={group} heading={group}>
                {items.map((entry) => (
                  <CommandItem
                    key={entry.href}
                    value={entry.title}
                    keywords={entry.description.split(/\s+/)}
                    onSelect={() => {
                      setOpen(false);
                      window.location.assign(entry.href);
                    }}
                  >
                    <span>{entry.title}</span>
                    <span className="truncate text-muted-foreground">{entry.description}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
