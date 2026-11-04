import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@robomous/ui-core";
import { VideoIcon } from "@robomous/ui-core/icons";

/** `ItemMedia` `variant`: `default` leaves leading content unstyled, `icon` sizes an icon, `image` crops a thumbnail to a fixed square. */
export default function Media() {
  return (
    <div className="grid w-full max-w-lg grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3">
      <span className="font-mono text-xs text-muted-foreground">default</span>
      <Item variant="outline">
        <ItemMedia>
          <span aria-hidden="true" className="size-2 rounded-full bg-success" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>cam-b07</ItemTitle>
          <ItemDescription>Online, dock A</ItemDescription>
        </ItemContent>
      </Item>
      <span className="font-mono text-xs text-muted-foreground">icon</span>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <VideoIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Monterrey DC-2</ItemTitle>
          <ItemDescription>48 cameras, 30-day retention</ItemDescription>
        </ItemContent>
      </Item>
      <span className="font-mono text-xs text-muted-foreground">image</span>
      <Item variant="outline">
        <ItemMedia variant="image">
          <img
            src="/assets/frames/dock.svg"
            alt="Latest frame from cam-b07: loading dock A with one roll-up door open, one half open, and workers by the staged pallets"
            loading="lazy"
            className="outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Latest frame, cam-b07</ItemTitle>
          <ItemDescription>Captured 2 seconds ago</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
