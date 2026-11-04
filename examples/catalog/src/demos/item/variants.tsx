import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@robomous/ui-core";
import { BotIcon, MapPinIcon, WrenchIcon } from "@robomous/ui-core/icons";

/** Three variants: `default` is borderless, `outline` draws a border, `muted` fills with the muted surface. */
export default function Variants() {
  return (
    <div className="grid w-full max-w-lg grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3">
      <span className="font-mono text-xs text-muted-foreground">default</span>
      <Item>
        <ItemMedia variant="icon">
          <BotIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>rb-07 Atlas</ItemTitle>
          <ItemDescription>Docked at bay 3, battery 82%</ItemDescription>
        </ItemContent>
      </Item>
      <span className="font-mono text-xs text-muted-foreground">outline</span>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <BotIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>rb-12 Kestrel</ItemTitle>
          <ItemDescription>Zone B sweep, 6 of 14 aisles</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon-sm" aria-label="Locate rb-12 Kestrel">
            <MapPinIcon />
          </Button>
        </ItemActions>
      </Item>
      <span className="font-mono text-xs text-muted-foreground">muted</span>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <WrenchIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>rb-03 Nopal</ItemTitle>
          <ItemDescription>In maintenance until Friday</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
