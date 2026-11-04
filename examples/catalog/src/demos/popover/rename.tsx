import {
  Badge,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  toast,
} from "@robomous/ui-core";
import { PencilIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** There is no PopoverClose, so own `open`: Save and Cancel close it, and so does a click away. */
export default function Rename() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState("Atlas");
  const [draft, setDraft] = useState(saved);

  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-2.5 pr-3">
      <img
        src="/assets/robots/atlas.svg"
        alt=""
        loading="lazy"
        className="size-14 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          {saved} <Badge variant="success">On mission</Badge>
        </span>
        <span className="text-muted-foreground">
          <span className="font-mono">rb-07</span> · AMR · Monterrey DC-2
        </span>
      </div>
      <Popover
        open={open}
        onOpenChange={(next) => {
          if (next) setDraft(saved);
          setOpen(next);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <PencilIcon data-icon="inline-start" />
            Rename
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(draft.trim());
              setOpen(false);
              toast.success(`Renamed to ${draft.trim()}`);
            }}
          >
            <PopoverHeader>
              <PopoverTitle>Rename robot</PopoverTitle>
              <PopoverDescription>Shown in the fleet list and on mission logs.</PopoverDescription>
            </PopoverHeader>
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              aria-label="Robot name"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={!draft.trim()}>
                Save
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
