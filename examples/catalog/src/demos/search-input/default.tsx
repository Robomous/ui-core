import { Kbd, Label, SearchInput } from "@robomous/ui-core";

/** Type something: a clear button appears at the end, and Escape empties the field and keeps focus in it. */
export default function Default() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="si-datasets">Datasets</Label>
      <SearchInput id="si-datasets" defaultValue="pallet" placeholder="Search datasets…" />
      <p className="flex items-center gap-1.5 text-muted-foreground">
        Press <Kbd>Esc</Kbd> to clear the search.
      </p>
    </div>
  );
}
