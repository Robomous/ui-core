import { Label, RadioGroup, RadioGroupItem } from "@robomous/ui-core";

/** `aria-invalid` on each item styles the destructive ring without hiding the current selection. */
export default function Invalid() {
  return (
    <RadioGroup aria-label="Visibility">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="draft" id="visibility-draft-invalid" aria-invalid />
        <Label htmlFor="visibility-draft-invalid">Draft</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="internal" id="visibility-internal-invalid" aria-invalid />
        <Label htmlFor="visibility-internal-invalid">Internal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="public" id="visibility-public-invalid" aria-invalid />
        <Label htmlFor="visibility-public-invalid">Public</Label>
      </div>
    </RadioGroup>
  );
}
