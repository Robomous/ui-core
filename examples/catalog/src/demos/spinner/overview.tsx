import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Spinner,
} from "@robomous/ui-core";

/** A background job in a list: the spinner takes the media slot, so the row reads as work in progress. */
export default function Overview() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="icon">
        <Spinner aria-label="Extracting frames" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Extracting frames</ItemTitle>
        <ItemDescription className="tabular-nums">
          walkthrough-04.mp4 · 1,240 of 3,600 · about a minute left
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </ItemActions>
    </Item>
  );
}
