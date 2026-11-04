import {
  Badge,
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@robomous/ui-core";
import { ScrollTextIcon } from "@robomous/ui-core/icons";

const epochs = Array.from({ length: 48 }, (_, index) => ({
  epoch: index + 1,
  loss: (1.84 / (1 + index * 0.28)).toFixed(3),
  map: (0.32 + 0.4 * (1 - Math.exp(-index / 12))).toFixed(2),
}));

/** The panel is a full-height flex column, so a `flex-1 overflow-y-auto` body scrolls between a fixed header and footer. */
export default function Scrolling() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-xl border bg-card p-3">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-center gap-2">
            <span className="font-mono text-sm font-medium">run-0412</span>
            <Badge variant="success">Finished</Badge>
          </span>
          <span className="truncate text-muted-foreground">
            detector-v3.2 · pallet-detection · Oct 28, 14:32
          </span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <ScrollTextIcon data-icon="inline-start" />
              View log
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>run-0412 log</SheetTitle>
              <SheetDescription>detector-v3.2 · one line per epoch.</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto border-t px-6 py-2 font-mono text-xs tabular-nums">
              {epochs.map(({ epoch, loss, map }) => (
                <div key={epoch} className="flex justify-between border-b border-dashed py-1.5">
                  <span>epoch {String(epoch).padStart(2, "0")}</span>
                  <span className="text-muted-foreground">
                    loss {loss} · mAP {map}
                  </span>
                </div>
              ))}
            </div>
            <SheetFooter className="flex-row justify-end border-t">
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
              <Button>Download .log</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-lg bg-border text-center">
        {[
          ["Epochs", "48"],
          ["Final loss", "0.126"],
          ["mAP", "0.71"],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col gap-0.5 bg-muted px-3 py-2">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-sm font-medium tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
