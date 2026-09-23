import { Checkbox, Label } from "@robomous/ui-core";

/** Disabled, checked and unchecked; the label dims with it through `peer`. */
export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="locked-off" disabled />
        <Label htmlFor="locked-off">Archived projects</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="locked-on" disabled defaultChecked />
        <Label htmlFor="locked-on">Required by your organisation</Label>
      </div>
    </div>
  );
}
