import { Button, toast } from "@robomous/ui-core";

/** `description` adds a second line under the title, for detail that does not belong in the title itself. */
export default function WithDescription() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Batch batch-0043 failed", {
          description: "Two frames reference a class that no longer exists.",
        })
      }
    >
      Reprocess batch
    </Button>
  );
}
