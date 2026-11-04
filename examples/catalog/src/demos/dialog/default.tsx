import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldLabel,
  Input,
} from "@robomous/ui-core";
import { PlusIcon } from "@robomous/ui-core/icons";

const datasets = [
  {
    name: "pallet-detection",
    frames: "18,204 frames",
    frame: "/assets/frames/dock.svg",
  },
  {
    name: "forklift-night",
    frames: "8,730 frames",
    frame: "/assets/frames/aisle-night.svg",
  },
  {
    name: "shelf-inspection-2026",
    frames: "2,118 frames",
    frame: "/assets/frames/aisle-3.svg",
  },
];

/** DialogHeader stacks the title and description; DialogClose turns any button into a dismiss action. */
export default function Default() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium">Datasets</span>
          <span className="text-muted-foreground">Monterrey DC-2</span>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusIcon data-icon="inline-start" />
              New dataset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New dataset</DialogTitle>
              <DialogDescription>Frames are grouped into batches as they arrive.</DialogDescription>
            </DialogHeader>
            <Field>
              <FieldLabel htmlFor="dlg-default-name">Name</FieldLabel>
              <Input id="dlg-default-name" placeholder="shelf-inspection-2026" />
            </Field>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button>Create</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="divide-y border-t">
        {datasets.map((dataset) => (
          <li key={dataset.name} className="flex items-center gap-3 px-4 py-2.5">
            <img
              src={dataset.frame}
              alt=""
              loading="lazy"
              className="size-9 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
            <span className="flex-1 truncate font-mono text-sm font-medium">{dataset.name}</span>
            <span className="text-muted-foreground tabular-nums">{dataset.frames}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
