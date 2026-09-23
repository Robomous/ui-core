import { Label, Input } from "@robomous/ui-core";

/** A label dims through `peer-disabled` when the control it names is disabled; the control must precede the label in the DOM for the sibling selector to reach it. */
export default function DisabledPeer() {
  return (
    <div className="flex flex-col-reverse gap-1.5">
      <Input id="lbl-frozen" defaultValue="30 fps" disabled className="peer w-48" />
      <Label htmlFor="lbl-frozen">Frame rate</Label>
    </div>
  );
}
