import {
  Button,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@robomous/ui-core";
import {
  ArchiveIcon,
  ChevronDownIcon,
  CopyIcon,
  DatabaseIcon,
  DownloadIcon,
  PencilIcon,
} from "@robomous/ui-core/icons";

/** Related actions grouped behind one row: it opens on hover or the right arrow key. */
export default function Submenu() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="icon">
        <DatabaseIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="font-mono">pallet-detection</ItemTitle>
        <ItemDescription className="tabular-nums">18,204 frames · 41 batches</ItemDescription>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Actions
              <ChevronDownIcon data-icon="inline-end" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52" align="end">
            <DropdownMenuItem>
              <PencilIcon />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CopyIcon />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DownloadIcon />
                Export as
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>COCO JSON</DropdownMenuItem>
                <DropdownMenuItem>YOLO</DropdownMenuItem>
                <DropdownMenuItem>Pascal VOC</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ArchiveIcon />
              Archive
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}
