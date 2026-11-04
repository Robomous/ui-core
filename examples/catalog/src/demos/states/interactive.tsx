import { Button, Checkbox, Input, Switch } from "@robomous/ui-core";

// The ring each component draws on `:focus-visible`, applied by hand so the
// second row can show it without a keyboard. The row is `inert`: a specimen,
// out of the tab order and away from the pointer.
const ring = "border-ring ring-2 ring-ring/30";

/** The top row is live: hover it, press it, tab through it. The bottom row holds the focus ring still, so it can be seen without a keyboard. */
export default function Interactive() {
  return (
    <div className="grid w-full max-w-xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[7rem_1fr] sm:items-center">
      <span className="font-mono text-[0.625rem] text-muted-foreground">live</span>
      <div className="flex flex-wrap items-center gap-3">
        <Button>Start ingest</Button>
        <Button variant="outline">Cancel</Button>
        <Input className="w-32" placeholder="Camera name" aria-label="Camera name" />
        <Checkbox aria-label="Auto-retry" defaultChecked />
        <Switch aria-label="Obstacle stop" />
      </div>
      <span className="mt-3 font-mono text-[0.625rem] text-muted-foreground sm:mt-0">
        focus-visible
      </span>
      <div inert className="flex flex-wrap items-center gap-3">
        <Button className={ring}>Start ingest</Button>
        <Button variant="outline" className={ring}>
          Cancel
        </Button>
        <Input className={`w-32 ${ring}`} placeholder="Camera name" aria-label="Camera name" />
        <Checkbox className={ring} aria-label="Auto-retry" defaultChecked />
        <Switch className={ring} aria-label="Obstacle stop" />
      </div>
    </div>
  );
}
