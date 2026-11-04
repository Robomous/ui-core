import { Button, DestructiveActionModal, toast } from "@robomous/ui-core";
import { useState } from "react";

/** A danger zone in dataset settings: the trigger sits in context, the modal asks for the name. */
export default function Overview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-destructive/25 bg-card">
      <div className="flex items-center gap-3 border-b border-destructive/25 bg-destructive/5 px-4 py-2.5">
        <img
          src="/assets/frames/dock.svg"
          alt=""
          className="size-10 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col">
          <span className="font-mono text-sm font-medium">pallet-detection</span>
          <span className="text-muted-foreground tabular-nums">
            18,204 frames · 41 batches · 3 models trained
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">Delete this dataset</span>
          <span className="text-pretty text-muted-foreground">
            Removes every frame, batch and annotation in it.
          </span>
        </div>
        <DestructiveActionModal
          open={open}
          onOpenChange={setOpen}
          trigger={<Button variant="destructive">Delete Dataset</Button>}
          title="Delete Dataset"
          description={
            <>
              <b>pallet-detection</b> and its 41 batches, 18,204 frames and every annotation on them
              will be permanently deleted.
            </>
          }
          irreversibleDescription="Deleting pallet-detection cannot be undone."
          verificationPhrase="pallet-detection"
          verificationLabel="dataset name"
          confirmLabel="Delete Dataset"
          onConfirm={() => {
            setOpen(false);
            toast.success("pallet-detection deleted");
          }}
        />
      </div>
    </div>
  );
}
