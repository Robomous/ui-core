import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  SplitButton,
} from "@robomous/ui-core";
import { PlayIcon } from "@robomous/ui-core/icons";

/** `icon` leads the label; a destructive item goes last, under a separator, out of reach of a stray click. */
export default function WithIcon() {
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <img
          src="/assets/frames/aisle-3.svg"
          alt=""
          loading="lazy"
          className="size-10 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">Aisle 14 sweep</span>
          <span className="text-muted-foreground tabular-nums">
            rb-07 Atlas · 12 waypoints · ~18 min
          </span>
        </div>
      </div>
      <SplitButton
        variant="secondary"
        icon={<PlayIcon data-icon="inline-start" />}
        label="Start Mission"
        menuLabel="More mission options"
        menuAlign="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>Start Mission</DropdownMenuItem>
          <DropdownMenuItem>Start in Simulation</DropdownMenuItem>
          <DropdownMenuItem>Schedule Mission</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Cancel Queued Missions</DropdownMenuItem>
      </SplitButton>
    </div>
  );
}
