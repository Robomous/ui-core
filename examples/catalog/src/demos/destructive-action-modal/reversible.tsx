import { Badge, Button, DestructiveActionModal } from "@robomous/ui-core";
import { useState } from "react";

/** A reversible action keeps the typed gate and drops the band: the friction is still warranted. */
export default function Reversible() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-2.5 pr-3">
      <img
        src="/assets/frames/floor.svg"
        alt=""
        loading="lazy"
        className="size-14 shrink-0 rounded-lg object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          Monterrey DC-2 <Badge variant="success">Active</Badge>
        </span>
        <span className="text-muted-foreground tabular-nums">14 robots on missions</span>
      </div>
      <DestructiveActionModal
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="destructive">Pause Fleet</Button>}
        title="Pause Fleet"
        description={
          <>
            All 14 robots at <b>Monterrey DC-2</b> finish their current step, stop in place and
            wait. Missions resume when the fleet is unpaused.
          </>
        }
        verificationPhrase="pause monterrey dc-2"
        confirmLabel="Pause Fleet"
        onConfirm={() => setOpen(false)}
      />
    </div>
  );
}
