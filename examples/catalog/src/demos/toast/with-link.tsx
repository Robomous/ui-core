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

/** The message can be JSX: a link to the thing the toast is about. */
export default function WithLink() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="image" className="size-10 rounded-md">
        <img
          src="/assets/frames/aisle-3.svg"
          alt=""
          loading="lazy"
          className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="font-mono">walkthrough-04.mp4</ItemTitle>
        <ItemDescription className="tabular-nums">12 min · 1080p · 18,000 frames</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast(
              <span>
                Extracted 940 frames.{" "}
                <a href="#" className="font-medium underline underline-offset-3">
                  Open dataset
                </a>
              </span>,
            )
          }
        >
          Extract
        </Button>
      </ItemActions>
    </Item>
  );
}
