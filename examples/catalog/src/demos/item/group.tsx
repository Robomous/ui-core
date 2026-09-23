import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@robomous/ui-core";
import { FileIcon, FolderIcon } from "@robomous/ui-core/icons";

/** `ItemGroup` is `role="list"`; `ItemSeparator` sits between rows in place of each item's own border. */
export default function Group() {
  return (
    <ItemGroup className="w-full max-w-lg">
      <Item>
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>batch-0041.zip</ItemTitle>
          <ItemDescription>311.9 MB, uploaded today</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>archive/</ItemTitle>
          <ItemDescription>48 batches</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
