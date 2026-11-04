import { Badge, Progress, SearchInput } from "@robomous/ui-core";

/** Disabled while there is nothing to search yet: a dataset still importing. The field dims, drops the clear button and leaves the shortcut unbound. */
export default function Disabled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center gap-3">
        <img
          src="/assets/frames/floor-2.svg"
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <span className="font-mono font-medium">shelf-inspection-2026</span>
        <Badge variant="warning" className="ml-auto">
          Importing
        </Badge>
      </div>
      <SearchInput disabled shortcut aria-label="Search frames" placeholder="Search frames…" />
      <Progress value={62} aria-label="Import progress" />
      <p className="text-muted-foreground tabular-nums">
        7,720 of 12,480 frames imported. Search opens when it finishes.
      </p>
    </div>
  );
}
