import {
  Badge,
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
  Progress,
} from "@robomous/ui-core";

/** `ItemHeader` and `ItemFooter` each take a full row, above and below the media and content line. */
export default function HeaderFooter() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemHeader>
        <span className="font-mono text-muted-foreground">deploy-2291</span>
        <Badge variant="info">rolling out</Badge>
      </ItemHeader>
      <ItemContent>
        <ItemTitle>detector-v3.2 to Monterrey DC-2</ItemTitle>
        <ItemDescription>Replacing v3.1 on 48 cameras, 12 at a time.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Roll back
        </Button>
      </ItemActions>
      <ItemFooter>
        <Progress value={75} aria-label="Cameras updated" />
        <span className="shrink-0 tabular-nums text-muted-foreground">36 / 48</span>
      </ItemFooter>
    </Item>
  );
}
