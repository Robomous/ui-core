"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { InfoIcon, ListFilterIcon, XIcon } from "lucide-react";

import { cn } from "cn";
import { Button } from "./button.js";
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "./command.js";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select.js";

/** One choice of a filter: the value in the URL and the words in the pill. */
interface FilterOption {
  value: string;
  label: string;
}

/** A constraint the bar can apply. `id` is the URL parameter it owns. */
interface FilterDefinition {
  id: string;
  label: string;
  options: FilterOption[];
  /** An option value worth offering before anyone picks one, drawn as a dashed pill. */
  suggestion?: string;
  /** Page context that shows but cannot be changed or removed. */
  readonly?: boolean;
  /** Why a readonly filter is there, in a hover card on its pill. */
  note?: React.ReactNode;
}

/** The applied filters, by id. A missing id is no constraint. */
type FilterValues = Record<string, string | undefined>;

/**
 * Filter state kept in the URL, so a filtered list survives a refresh and can
 * be linked. It reads and writes only the parameters named in `ids`, so
 * removing a filter never clears unrelated page state. History entries are
 * replaced, not pushed: the back button leaves the page, not the last click.
 */
function useFilterParams(ids: string[]): [FilterValues, (next: FilterValues) => void] {
  const key = ids.join("\u0000");
  const read = React.useCallback((): FilterValues => {
    if (typeof window === "undefined") return {};
    const params = new URLSearchParams(window.location.search);
    return Object.fromEntries(key.split("\u0000").map((id) => [id, params.get(id) ?? undefined]));
  }, [key]);
  const [values, setValues] = React.useState<FilterValues>(read);

  React.useEffect(() => {
    const sync = () => setValues(read());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, [read]);

  const update = React.useCallback(
    (next: FilterValues) => {
      const url = new URL(window.location.href);
      for (const id of key.split("\u0000")) {
        const value = next[id];
        if (value) url.searchParams.set(id, value);
        else url.searchParams.delete(id);
      }
      window.history.replaceState(window.history.state, "", url);
      setValues(next);
    },
    [key],
  );

  return [values, update];
}

const pill =
  "inline-flex h-7 max-w-full items-center gap-1 rounded-full border px-2.5 text-xs/relaxed whitespace-nowrap";

/**
 * A filter bar: an Add filter button and one pill per applied filter. The
 * button opens a searchable list of the chosen filter's options, with a picker
 * to switch filters in the same place. Controlled with `values` and
 * `onValuesChange` — pair it with `useFilterParams` to keep the state in the
 * URL — or left to itself with `defaultValues`.
 */
function FilterParamsBar({
  className,
  filters,
  values: valuesProp,
  defaultValues,
  onValuesChange,
  addLabel = "Add filter",
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  filters: FilterDefinition[];
  values?: FilterValues;
  defaultValues?: FilterValues;
  onValuesChange?: (values: FilterValues) => void;
  addLabel?: string;
}) {
  const [valuesState, setValuesState] = React.useState<FilterValues>(defaultValues ?? {});
  const values = valuesProp ?? valuesState;
  const editable = filters.filter((filter) => !filter.readonly);
  const [open, setOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState(editable[0]?.id ?? "");
  const [search, setSearch] = React.useState("");
  const active = editable.find((filter) => filter.id === activeId) ?? editable[0];

  const setValue = (id: string, value: string | undefined) => {
    const next = { ...values, [id]: value };
    if (valuesProp === undefined) setValuesState(next);
    onValuesChange?.(next);
  };

  const labelOf = (filter: FilterDefinition, value: string) =>
    filter.options.find((option) => option.value === value)?.label ?? value;

  return (
    <div
      data-slot="filter-params-bar"
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {editable.length > 0 && (
        <Popover
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) setSearch("");
          }}
        >
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-7 rounded-full pr-3 pl-2.5">
              <ListFilterIcon data-icon="inline-start" />
              {addLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 gap-0 overflow-hidden p-0">
            <CommandPrimitive className="flex flex-col" loop>
              <div className="flex h-9 items-center border-b">
                <Select
                  value={active?.id}
                  onValueChange={(id) => {
                    setActiveId(id);
                    setSearch("");
                  }}
                >
                  <SelectTrigger
                    aria-label="Filter by"
                    className="h-full! shrink-0 rounded-none border-0 border-r bg-transparent px-3 shadow-none focus-visible:ring-0 dark:bg-transparent"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" align="start">
                    {editable.map((filter) => (
                      <SelectItem key={filter.id} value={filter.id}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <CommandPrimitive.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Filter to…"
                  aria-label={`Search ${active?.label ?? ""} options`}
                  className="h-full min-w-0 flex-1 bg-transparent px-3 text-xs/relaxed outline-hidden placeholder:text-muted-foreground"
                />
              </div>
              <CommandList className="max-h-64 p-1">
                <CommandEmpty>No matches.</CommandEmpty>
                <CommandGroup className="p-0">
                  {active?.options.map((option) => {
                    const checked = values[active.id] === option.value;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        data-checked={checked}
                        onSelect={() => {
                          setValue(active.id, checked ? undefined : option.value);
                          setOpen(false);
                          setSearch("");
                        }}
                      >
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </CommandPrimitive>
          </PopoverContent>
        </Popover>
      )}
      {filters.map((filter) => {
        const value = values[filter.id];
        if (value) {
          return (
            <span key={filter.id} data-slot="filter-params-pill" className={pill}>
              <span className="text-muted-foreground">{filter.label}</span>
              <span className="truncate font-medium">{labelOf(filter, value)}</span>
              {filter.readonly ? (
                filter.note && (
                  <HoverCard openDelay={150} closeDelay={100}>
                    <HoverCardTrigger asChild>
                      <button
                        type="button"
                        aria-label={`Why ${filter.label} is fixed`}
                        className="-mr-1 grid size-5 place-items-center rounded-full text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
                      >
                        <InfoIcon aria-hidden className="size-3.5" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent align="start" className="w-64">
                      {filter.note}
                    </HoverCardContent>
                  </HoverCard>
                )
              ) : (
                <button
                  type="button"
                  aria-label={`Remove ${filter.label} filter`}
                  onClick={() => setValue(filter.id, undefined)}
                  className="-mr-1 grid size-5 place-items-center rounded-full text-muted-foreground transition-colors duration-150 ease-out outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
                >
                  <XIcon aria-hidden className="size-3" />
                </button>
              )}
            </span>
          );
        }
        if (filter.suggestion && !filter.readonly) {
          return (
            <button
              key={filter.id}
              type="button"
              data-slot="filter-params-suggestion"
              onClick={() => setValue(filter.id, filter.suggestion)}
              className={cn(
                pill,
                "border-dashed text-muted-foreground transition-colors duration-150 ease-out outline-none hover:border-solid hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30",
              )}
            >
              <span className="sr-only">Apply</span> {filter.label}{" "}
              <span className="font-medium">{labelOf(filter, filter.suggestion)}</span>
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export { FilterParamsBar, useFilterParams };
export type { FilterDefinition, FilterOption, FilterValues };
