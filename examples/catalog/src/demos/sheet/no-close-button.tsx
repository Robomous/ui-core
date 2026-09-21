import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@robomous/ui-core";

/** `showCloseButton={false}` — the call site owns dismissal, here via the footer's own buttons. */
export default function NoCloseButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Export to COCO</Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>Export to COCO</SheetTitle>
          <SheetDescription>Only annotated frames are included.</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Export</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
