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

/** An action button on the toast itself, for the one place the reader will want to go next. */
export default function WithAction() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="image" className="size-10 rounded-md">
        <img
          src="/assets/frames/dock-2.svg"
          alt=""
          loading="lazy"
          className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="font-mono">detector-v3.2</ItemTitle>
        <ItemDescription className="tabular-nums">
          Fine-tune on batch 0412 · 14 classes
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="default"
          size="sm"
          onClick={() =>
            toast.success("Training run-0419 started", {
              description: "Queued on 2 GPUs. First epoch in about 4 minutes.",
              action: {
                label: "View run",
                onClick: () => toast.info("Opening run-0419"),
              },
            })
          }
        >
          Start run
        </Button>
      </ItemActions>
    </Item>
  );
}
