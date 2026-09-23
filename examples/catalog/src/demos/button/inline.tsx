import { Button } from "@robomous/ui-core";

/** The inline size sits inside a sentence, with the line's own height. */
export default function Inline() {
  return (
    <p className="max-w-sm text-sm text-muted-foreground">
      Nothing was uploaded yet.{" "}
      <Button variant="link" size="inline">
        Pick a folder
      </Button>{" "}
      to begin.
    </p>
  );
}
