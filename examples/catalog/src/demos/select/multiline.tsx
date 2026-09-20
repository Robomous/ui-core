import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@robomous/ui-core";

/** `multiline` lets a long value wrap instead of clamping to one line and overflowing the box. */
export default function Multiline() {
  return (
    <Select defaultValue="ft">
      <SelectTrigger multiline className="w-56" aria-label="Model checkpoint">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ft">org/detector-large finetuned on warehouse cameras, v3</SelectItem>
        <SelectItem value="base">org/detector-base</SelectItem>
      </SelectContent>
    </Select>
  );
}
