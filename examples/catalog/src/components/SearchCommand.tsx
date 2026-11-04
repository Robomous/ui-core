import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  Kbd,
  KbdGroup,
} from "@robomous/ui-core";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CornerDownLeftIcon,
  SearchIcon,
} from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

import { pageIcon } from "@/lib/page-icons";

interface Entry {
  title: string;
  href: string;
  description: string;
  group: string;
}

/*
 * cmdk's own filter is fuzzy, and over a page's whole description a fuzzy
 * match finds almost every page for three letters; it also keeps the groups
 * in their order, so a weak hit in an early group sits above an exact one.
 * The palette ranks the pages itself instead: a title that starts with the
 * query first, then a title that holds it, then a page whose group or
 * description holds it. Anything else is out.
 */
function rank(entry: Entry, query: string): number {
  const title = entry.title.toLowerCase();
  if (title.startsWith(query)) return 3;
  if (title.includes(query)) return 2;
  return `${entry.group} ${entry.description}`.toLowerCase().includes(query) ? 1 : 0;
}

/**
 * Search over the page index (`/search.json`, built from the content
 * collections): a Command palette opened from the header or with Cmd/Ctrl+K.
 * The palette is a wide sheet of results under a borderless field: each page
 * shows its icon, its title and a line of what it covers, the selected row
 * says Enter opens it, and the footer names the keys.
 */
export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [query, setQuery] = useState("");

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

  // Each opening starts from an empty field.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

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

  const search = query.trim().toLowerCase();
  const results = search
    ? (entries ?? [])
        .map((entry) => ({ entry, score: rank(entry, search) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ entry }) => entry)
    : null;

  // A result names its group in front of the description, since the list no
  // longer sits under the group's heading.
  const item = (entry: Entry, withGroup: boolean) => {
    const Icon = pageIcon(entry.href);
    return (
      <CommandItem
        key={entry.href}
        value={entry.href}
        onSelect={() => {
          setOpen(false);
          window.location.assign(entry.href);
        }}
        className="gap-3 rounded-lg px-2.5 py-2"
      >
        <Icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
        <span className="flex min-w-0 flex-col">
          <span className="text-sm text-foreground">{entry.title}</span>
          <span className="truncate text-muted-foreground">
            {withGroup && <span className="text-foreground/70">{entry.group} · </span>}
            {entry.description}
          </span>
        </span>
        <CommandShortcut className="opacity-0 group-data-selected/command-item:opacity-100">
          <CornerDownLeftIcon className="size-3.5" />
        </CommandShortcut>
      </CommandItem>
    );
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-8 justify-start gap-2 rounded-lg bg-muted/50 px-2 font-normal text-muted-foreground shadow-none hover:bg-muted hover:text-foreground sm:w-60 sm:px-2.5 dark:bg-muted/40"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
      >
        <SearchIcon data-icon="inline-start" />
        <span className="hidden sm:inline">Search docs…</span>
        <KbdGroup className="ml-auto hidden sm:inline-flex">
          <Kbd className="bg-background">⌘</Kbd>
          <Kbd className="bg-background">K</Kbd>
        </KbdGroup>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Type to filter the pages; Enter opens the selected one."
        className="top-[16vh] gap-0 sm:max-w-xl"
      >
        {/* The field is the palette's top edge rather than a box inside it:
            taller, unbordered, with a hairline under it. */}
        <Command
          shouldFilter={false}
          className="rounded-none p-0 [&_[data-slot=command-input-wrapper]]:border-b [&_[data-slot=command-input-wrapper]]:p-0 [&_[data-slot=input-group]]:h-12! [&_[data-slot=input-group]]:rounded-none! [&_[data-slot=input-group]]:border-0! [&_[data-slot=input-group]]:bg-transparent! [&_[data-slot=input-group]]:px-2 [&_[data-slot=input-group]]:ring-0! [&_[data-slot=input-group-addon]_svg]:size-4! [&_[data-slot=input-group-addon]_svg]:opacity-60"
        >
          <CommandInput
            placeholder="Search pages and components…"
            className="text-sm"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-[min(26rem,60vh)] scroll-py-2 p-2">
            <CommandEmpty className="py-10 text-sm text-muted-foreground">
              {entries === null ? "Loading…" : `No page matches “${query.trim()}”.`}
            </CommandEmpty>
            {results
              ? results.length > 0 && (
                  <CommandGroup heading="Results" className="p-0 pb-2">
                    {results.map((entry) => item(entry, true))}
                  </CommandGroup>
                )
              : [...groups].map(([group, items]) => (
                  <CommandGroup key={group} heading={group} className="p-0 pb-2">
                    {items.map((entry) => item(entry, false))}
                  </CommandGroup>
                ))}
          </CommandList>
        </Command>
        <div className="flex h-10 items-center gap-4 border-t px-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <KbdGroup>
              <Kbd>
                <ArrowUpIcon />
              </Kbd>
              <Kbd>
                <ArrowDownIcon />
              </Kbd>
            </KbdGroup>
            Navigate
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>
              <CornerDownLeftIcon />
            </Kbd>
            Open
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>Esc</Kbd>
            Close
          </span>
        </div>
      </CommandDialog>
    </>
  );
}
