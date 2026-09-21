import { Button, toast } from "@robomous/ui-core";

/** An action button on the toast itself, reserved for the one thing worth doing right after — usually undoing it. */
export default function WithAction() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Annotation deleted", {
          action: {
            label: "Undo",
            onClick: () => toast("Annotation restored"),
          },
        })
      }
    >
      Delete annotation
    </Button>
  );
}
