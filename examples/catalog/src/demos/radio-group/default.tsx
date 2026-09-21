import { Label, RadioGroup, RadioGroupItem } from "@robomous/ui-core";

/** One tab stop for the whole group; the arrow keys move the selection, not just focus. */
export default function Default() {
  return (
    <RadioGroup defaultValue="internal" aria-label="Visibility">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="draft" id="visibility-draft" />
        <Label htmlFor="visibility-draft">Draft</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="internal" id="visibility-internal" />
        <Label htmlFor="visibility-internal">Internal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="public" id="visibility-public" />
        <Label htmlFor="visibility-public">Public</Label>
      </div>
    </RadioGroup>
  );
}
