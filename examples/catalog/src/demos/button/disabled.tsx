import { Button } from "@robomous/ui-core";

/** Disabled keeps the arrow cursor: nothing will respond to a press. */
export default function Disabled() {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border">
      <div className="flex flex-col gap-2 p-4">
        <span className="font-medium">Site settings · Monterrey DC-2</span>
        <div className="flex items-center gap-2">
          <Button disabled>Save changes</Button>
          <Button variant="outline" disabled>
            Cancel
          </Button>
        </div>
        <span className="text-muted-foreground">Nothing to save: no fields have changed.</span>
      </div>
      <div className="flex flex-col gap-2 border-t p-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono">rk_live_…8f2a</span>
          <span className="text-muted-foreground">Last used 2 h ago</span>
        </div>
        <Button variant="destructive" className="self-start" disabled>
          Revoke key
        </Button>
        <span className="text-muted-foreground text-pretty">
          This key is used by 2 live deployments. Detach them first.
        </span>
      </div>
    </div>
  );
}
