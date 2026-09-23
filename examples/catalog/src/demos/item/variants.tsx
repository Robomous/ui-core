import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@robomous/ui-core";
import { CopyIcon, FileIcon, TrashIcon } from "@robomous/ui-core/icons";

/** Three variants: `default` is borderless, `outline` draws a border, `muted` fills with the muted surface. */
export default function Variants() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <Item>
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>batch-0041.zip</ItemTitle>
          <ItemDescription>311.9 MB, uploaded today</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>batch-0042.zip</ItemTitle>
          <ItemDescription>218.4 MB, uploaded today</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon-sm" aria-label="Copy link to batch-0042.zip">
            <CopyIcon />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Delete batch-0042.zip">
            <TrashIcon />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>archive/</ItemTitle>
          <ItemDescription>48 batches</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
