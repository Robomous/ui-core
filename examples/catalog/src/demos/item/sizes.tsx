import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@robomous/ui-core";
import { FolderIcon } from "lucide-react";

/** `size` steps `default` down to `sm` and `xs`, tightening the row's own padding and the gap between stacked items with it. */
export default function Sizes() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>warehouse-b/</ItemTitle>
          <ItemDescription>Default size</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>dock-a/</ItemTitle>
          <ItemDescription>Small</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <FolderIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>archive/</ItemTitle>
          <ItemDescription>Extra small</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
