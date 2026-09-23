import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@robomous/ui-core";

/** `direction` picks the edge the drawer opens from; only the bottom direction gets a drag handle. */
export default function Directions() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(["top", "right", "bottom", "left"] as const).map((direction) => (
        <Drawer key={direction} direction={direction}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="capitalize">
              {direction}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="capitalize">{direction} drawer</DrawerTitle>
              <DrawerDescription>Opens from the {direction} edge.</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
