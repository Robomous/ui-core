import { Badge, Button, DestructiveActionModal } from "@robomous/ui-core";
import { KeyRoundIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const initialKeys = [
  { name: "ci-deploy", token: "rk_live_…9f2c", lastUsed: "Last used 3 hours ago", scope: "Write" },
  {
    name: "notebook-eu",
    token: "rk_live_…41ab",
    lastUsed: "Last used yesterday",
    scope: "Read",
  },
  {
    name: "edge-gateway",
    token: "rk_live_…c07d",
    lastUsed: "Last used 12 days ago",
    scope: "Read",
  },
];

/** One modal serves every row: no `trigger`, `open` in state, and the phrase follows the chosen key. */
export default function FromRow() {
  const [keys, setKeys] = useState(initialKeys);
  const [target, setTarget] = useState(initialKeys[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <ul className="divide-y overflow-hidden rounded-xl border bg-card">
        {keys.map((key) => (
          <li key={key.name} className="flex items-center gap-3 py-2.5 pr-2.5 pl-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <KeyRoundIcon className="size-4" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="flex items-center gap-2">
                <span className="truncate font-mono text-sm font-medium">{key.name}</span>
                <Badge variant="quiet">{key.scope}</Badge>
              </span>
              <span className="truncate text-muted-foreground">
                <span className="font-mono">{key.token}</span> · {key.lastUsed}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTarget(key);
                setOpen(true);
              }}
            >
              Revoke
            </Button>
          </li>
        ))}
        {keys.length === 0 && (
          <li className="flex items-center justify-between px-3 py-3">
            <span className="text-muted-foreground">No active keys.</span>
            <Button variant="outline" size="sm" onClick={() => setKeys(initialKeys)}>
              Create key
            </Button>
          </li>
        )}
      </ul>
      <DestructiveActionModal
        open={open}
        onOpenChange={setOpen}
        title="Revoke API Key"
        description={
          <>
            Requests signed with <b>{target.name}</b> start failing at once.
          </>
        }
        irreversibleDescription={`Revoking ${target.name} cannot be undone.`}
        verificationPhrase={target.name}
        verificationLabel="key name"
        confirmLabel="Revoke API Key"
        onConfirm={() => {
          setKeys((current) => current.filter((key) => key.name !== target.name));
          setOpen(false);
        }}
      />
    </div>
  );
}
