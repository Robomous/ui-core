import { Button, Spinner } from "@robomous/ui-core";

/** There is no isPending prop: compose a Spinner into the Button and disable it yourself. */
export default function InButton() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Uploading
      </Button>
      <Button variant="outline" size="sm" disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
    </div>
  );
}
