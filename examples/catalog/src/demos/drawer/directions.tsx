import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@robomous/ui-core";

const directions = ["top", "right", "bottom", "left"] as const;

const batches = [
  ["batch-0042", "1,248 frames · approved"],
  ["batch-0043", "980 frames · pending review"],
  ["batch-0044", "1,102 frames · ingesting"],
];

/** `direction` picks the edge the drawer opens from; only the bottom direction gets a drag handle. */
export default function Directions() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {directions.map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="capitalize">
              {direction}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Recent batches</DrawerTitle>
              <DrawerDescription>Opens from the {direction} edge.</DrawerDescription>
            </DrawerHeader>
            <ItemGroup className="mx-auto w-full max-w-md gap-1 px-1 pb-4">
              {batches.map(([name, detail]) => (
                <Item key={name} size="sm">
                  <ItemContent>
                    <ItemTitle>{name}</ItemTitle>
                    <ItemDescription>{detail}</ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
