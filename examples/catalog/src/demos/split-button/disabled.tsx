import { Badge, DropdownMenuGroup, DropdownMenuItem, SplitButton } from "@robomous/ui-core";

/** `disabled` turns off both halves at once, so the menu can't be opened around a blocked primary action. */
export default function Disabled() {
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <img
          src="/assets/frames/aisle-night.svg"
          alt=""
          loading="lazy"
          className="size-10 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col gap-1">
          <span className="font-medium">forklift-night</span>
          <div className="flex items-center gap-2">
            <Badge variant="warning">3 frames unlabeled</Badge>
            <span className="text-muted-foreground tabular-nums">8,730 frames</span>
          </div>
        </div>
      </div>
      <SplitButton
        label="Publish dataset"
        menuLabel="More publish options"
        menuAlign="end"
        disabled
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>Publish dataset</DropdownMenuItem>
          <DropdownMenuItem>Publish as Private</DropdownMenuItem>
        </DropdownMenuGroup>
      </SplitButton>
    </div>
  );
}
