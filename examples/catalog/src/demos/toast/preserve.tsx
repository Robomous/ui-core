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

/** `duration: Infinity` keeps a toast until it is closed, for something the reader must act on. */
export default function Preserve() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="image" className="size-10 rounded-md">
        <img
          src="/assets/robots/kestrel.svg"
          alt=""
          loading="lazy"
          className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>rb-12 “Kestrel”</ItemTitle>
        <ItemDescription className="tabular-nums">Aisle 14 · mission in progress</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.warning(
              "rb-12 stopped at a blocked aisle and is waiting for a person to clear it.",
              {
                duration: Infinity,
              },
            )
          }
        >
          Simulate block
        </Button>
      </ItemActions>
    </Item>
  );
}
