import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@robomous/ui-core";
import { FileIcon } from "lucide-react";

/** `asChild` hands the row's classes to an anchor, so the whole item is a link and stays reachable as one tab stop. */
export default function AsChild() {
  return (
    <Item asChild variant="outline" className="w-full max-w-lg">
      <a href="/datasets/warehouse-b">
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>warehouse-b</ItemTitle>
          <ItemDescription>Open the dataset</ItemDescription>
        </ItemContent>
      </a>
    </Item>
  );
}
