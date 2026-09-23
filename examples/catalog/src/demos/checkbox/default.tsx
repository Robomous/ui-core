import { Checkbox, Label } from "@robomous/ui-core";

/** A checkbox carries no text of its own; its label toggles it through `htmlFor`. */
export default function Default() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept the terms of use</Label>
    </div>
  );
}
