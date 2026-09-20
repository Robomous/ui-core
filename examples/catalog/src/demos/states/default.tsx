import { Button, Input } from "@robomous/ui-core";

/** Hover and focus are live: move the pointer over a row, then tab through it. */
export default function Default() {
  return (
    <div className="grid w-full grid-cols-[6rem_1fr] items-center gap-x-6 gap-y-4 text-sm">
      <span className="text-muted-foreground">default</span>
      <div className="flex flex-wrap gap-2">
        <Button>Start ingest</Button>
        <Button variant="outline">Cancel</Button>
        <Input className="w-48" placeholder="Camera name" aria-label="Camera name" />
      </div>
      <span className="text-muted-foreground">disabled</span>
      <div className="flex flex-wrap gap-2">
        <Button disabled>Start ingest</Button>
        <Button variant="outline" disabled>
          Cancel
        </Button>
        <Input
          className="w-48"
          placeholder="Camera name"
          aria-label="Disabled camera name"
          disabled
        />
      </div>
    </div>
  );
}
