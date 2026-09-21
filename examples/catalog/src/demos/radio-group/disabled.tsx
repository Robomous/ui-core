import { Label, RadioGroup, RadioGroupItem } from "@robomous/ui-core";

/** A single disabled option inside an otherwise enabled group; its label dims to match. */
export default function Disabled() {
  return (
    <RadioGroup defaultValue="internal" aria-label="Visibility">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="draft" id="visibility-draft-disabled" />
        <Label htmlFor="visibility-draft-disabled">Draft</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="internal" id="visibility-internal-disabled" />
        <Label htmlFor="visibility-internal-disabled">Internal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="public" id="visibility-public-disabled" disabled />
        <Label htmlFor="visibility-public-disabled">Public</Label>
      </div>
    </RadioGroup>
  );
}
