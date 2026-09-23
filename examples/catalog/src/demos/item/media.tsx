import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@robomous/ui-core";
import { FileIcon } from "@robomous/ui-core/icons";

/** `ItemMedia` `variant`: `default` leaves leading content unstyled, `icon` sizes an icon, `image` crops a thumbnail to a fixed square. */
export default function Media() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <Item variant="outline">
        <ItemMedia>
          <span aria-hidden="true" className="size-2 rounded-full bg-success" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>cam-b07</ItemTitle>
          <ItemDescription>Online</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>batch-0041.zip</ItemTitle>
          <ItemDescription>311.9 MB</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="image">
          <img src="/placeholder-frame.svg" alt="Latest frame from cam-b07" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Frame preview</ItemTitle>
          <ItemDescription>Captured 2 seconds ago</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
