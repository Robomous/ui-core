import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  toast,
} from "@robomous/ui-core";

/** `cancel` and `action` together: a Dismiss and an Undo where the X would be, and no X. */
export default function Undo() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="image" className="size-10 rounded-md">
        <img
          src="/assets/frames/aisle-night.svg"
          alt=""
          loading="lazy"
          className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Blurry frames</ItemTitle>
        <ItemDescription className="tabular-nums">
          12 flagged in batch 0412 · cam-a12
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast("Removed 12 frames from batch 0412.", {
              cancel: { label: "Dismiss", onClick: () => {} },
              action: { label: "Undo", onClick: () => toast("Restored 12 frames") },
            })
          }
        >
          Remove
        </Button>
      </ItemActions>
    </Item>
  );
}
