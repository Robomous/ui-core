import {
  Badge,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@robomous/ui-core";
import { CpuIcon } from "@robomous/ui-core/icons";

const models = [
  { size: "default", name: "detector-v3.2", map: "0.912", status: "production" },
  { size: "sm", name: "detector-v3.1", map: "0.897", status: "staging" },
  { size: "xs", name: "detector-v3.0", map: "0.871", status: "archived" },
] as const;

/** `sm` shrinks the icon tile; `xs` shrinks it further and trims the row's padding and the gap inside its content. */
export default function Sizes() {
  return (
    <div className="grid w-full max-w-lg grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3">
      {models.map(({ size, name, map, status }) => (
        <div key={size} className="contents">
          <span className="font-mono text-xs text-muted-foreground">{size}</span>
          <Item variant="outline" size={size}>
            <ItemMedia variant="icon">
              <CpuIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>
                mAP@50 <span className="tabular-nums">{map}</span>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="quiet">{status}</Badge>
            </ItemActions>
          </Item>
        </div>
      ))}
    </div>
  );
}
