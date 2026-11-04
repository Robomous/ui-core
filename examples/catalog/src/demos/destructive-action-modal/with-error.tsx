import { Avatar, AvatarFallback, Badge, Button, DestructiveActionModal } from "@robomous/ui-core";
import { BotIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** `error` surfaces the failure under the input and keeps the modal open for a retry. */
export default function WithError() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card py-2.5 pr-3 pl-3">
      <Avatar size="lg">
        <AvatarFallback>
          <BotIcon className="size-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-2 text-sm font-medium">
          <span>
            <span className="font-mono">rb-07</span> Atlas
          </span>
          <Badge variant="warning">On mission</Badge>
        </span>
        <span className="truncate text-muted-foreground tabular-nums">
          Aisle 14 · 64% of route · Battery 71%
        </span>
      </div>
      <DestructiveActionModal
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          setError(null);
        }}
        trigger={<Button variant="destructive">Remove Robot</Button>}
        title="Remove Robot"
        description={
          <>
            <b>rb-07 Atlas</b> leaves the fleet and its telemetry history is deleted.
          </>
        }
        irreversibleDescription="Removing rb-07 cannot be undone."
        verificationPhrase="rb-07"
        verificationLabel="robot ID"
        confirmLabel="Remove Robot"
        error={error}
        onConfirm={() => setError("Couldn't remove rb-07 while it is on a mission. Try again.")}
      />
    </div>
  );
}
