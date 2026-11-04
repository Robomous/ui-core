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

/** `description` adds a second line under the title, for detail that does not belong in the title itself. */
export default function WithDescription() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="image" className="size-10 rounded-md">
        <img
          src="/assets/frames/floor-2.svg"
          alt=""
          loading="lazy"
          className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="font-mono">batch-0043</ItemTitle>
        <ItemDescription className="tabular-nums">
          1,204 frames · needs reprocessing
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.error("Batch 0043 failed to process", {
              description: "Two frames reference a class that no longer exists.",
            })
          }
        >
          Reprocess
        </Button>
      </ItemActions>
    </Item>
  );
}
