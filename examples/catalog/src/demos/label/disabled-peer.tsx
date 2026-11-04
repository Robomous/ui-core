import { Input, Label } from "@robomous/ui-core";

/** The control carries `peer` and comes first in the DOM, so its label dims with it; `flex-col-reverse` puts each label back on top. */
export default function DisabledPeer() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="flex flex-col-reverse gap-2">
        <Input id="lb-hostname" defaultValue="rb-12.mty-dc2" className="peer font-mono" />
        <Label htmlFor="lb-hostname">Hostname</Label>
      </div>
      <div className="flex flex-col-reverse gap-2">
        <Input id="lb-firmware" defaultValue="v2.14.1" disabled className="peer font-mono" />
        <Label htmlFor="lb-firmware">Firmware version</Label>
      </div>
    </div>
  );
}
