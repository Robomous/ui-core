import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  FieldLabel,
  Input,
} from "@robomous/ui-core";
import { CopyIcon, EllipsisIcon, PencilIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const initial = [
  {
    id: 1,
    name: "pallet-detection",
    frames: "18,204 frames",
    frame: "/assets/frames/dock.svg",
  },
  {
    id: 2,
    name: "forklift-night",
    frames: "8,730 frames",
    frame: "/assets/frames/aisle-night.svg",
  },
  {
    id: 3,
    name: "shelf-inspection-2026",
    frames: "2,118 frames",
    frame: "/assets/frames/aisle-3.svg",
  },
];

/** A menu item cannot hold a trigger, so one dialog lives beside the menus and each item opens it. */
export default function FromMenu() {
  const [datasets, setDatasets] = useState(initial);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const target = datasets.find((dataset) => dataset.id === targetId);

  return (
    <div className="w-full max-w-md">
      <ul className="divide-y overflow-hidden rounded-xl border bg-card">
        {datasets.map((dataset) => (
          <li key={dataset.id} className="flex items-center gap-3 py-2.5 pr-2 pl-3">
            <img
              src={dataset.frame}
              alt=""
              loading="lazy"
              className="size-9 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-mono text-sm font-medium">{dataset.name}</span>
              <span className="text-muted-foreground tabular-nums">{dataset.frames}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${dataset.name}`}>
                  <EllipsisIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onSelect={() => {
                    setDraft(dataset.name);
                    setTargetId(dataset.id);
                  }}
                >
                  <PencilIcon />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CopyIcon />
                  Duplicate
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>
      <Dialog open={target !== undefined} onOpenChange={(open) => !open && setTargetId(null)}>
        <DialogContent>
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setDatasets((current) =>
                current.map((dataset) =>
                  dataset.id === targetId
                    ? { ...dataset, name: draft.trim() || dataset.name }
                    : dataset,
                ),
              );
              setTargetId(null);
            }}
          >
            <DialogHeader>
              <DialogTitle>Rename dataset</DialogTitle>
              <DialogDescription>
                Runs that use it keep working under the new name.
              </DialogDescription>
            </DialogHeader>
            <Field>
              <FieldLabel htmlFor="dlg-menu-name">Name</FieldLabel>
              <Input
                id="dlg-menu-name"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                className="font-mono"
              />
            </Field>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
