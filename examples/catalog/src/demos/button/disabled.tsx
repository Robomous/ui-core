import { Button } from "@robomous/ui-core";

/** Disabled keeps the arrow cursor: nothing will respond to a press. */
export default function Disabled() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>Save changes</Button>
      <Button variant="outline" disabled>
        Cancel
      </Button>
      <Button variant="destructive" disabled>
        Delete dataset
      </Button>
    </div>
  );
}
