import { Input, Label } from "@robomous/ui-core";

/** When the label comes first, put `group` and `data-disabled="true"` on a shared parent and the label dims from there. */
export default function DisabledGroup() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="group flex flex-col gap-2">
        <Label htmlFor="lb-name">Display name</Label>
        <Input id="lb-name" defaultValue="Atlas" />
      </div>
      <div className="group flex flex-col gap-2" data-disabled="true">
        <Label htmlFor="lb-serial">Serial number</Label>
        <Input id="lb-serial" defaultValue="RB-07-2209-4417" disabled className="font-mono" />
      </div>
    </div>
  );
}
