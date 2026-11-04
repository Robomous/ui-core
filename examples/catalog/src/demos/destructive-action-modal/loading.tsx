import { Badge, Button, DestructiveActionModal, toast } from "@robomous/ui-core";
import { KeyRoundIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** `loading` holds both buttons and spins on the primary while the request is in flight. */
export default function Loading() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function revoke() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toast.success("ci-deploy revoked");
    }, 1800);
  }

  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card py-2.5 pr-3 pl-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <KeyRoundIcon className="size-4" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium">ci-deploy</span>
          <Badge variant="quiet">Write</Badge>
        </span>
        <span className="truncate text-muted-foreground tabular-nums">
          Used by 3 pipelines · Last used 3 hours ago
        </span>
      </div>
      <DestructiveActionModal
        open={open}
        onOpenChange={setOpen}
        trigger={<Button variant="destructive">Revoke API Key</Button>}
        title="Revoke API Key"
        description={
          <>
            Requests signed with <b>ci-deploy</b> start failing at once. Pipelines that use it need
            a new key.
          </>
        }
        irreversibleDescription="Revoking ci-deploy cannot be undone."
        verificationPhrase="ci-deploy"
        verificationLabel="key name"
        confirmLabel="Revoke API Key"
        loading={loading}
        onConfirm={revoke}
      />
    </div>
  );
}
