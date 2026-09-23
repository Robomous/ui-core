import { ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "@robomous/ui-core/icons";

/** `spacing={0}` welds the segments into one control, sharing borders instead of gaps. */
export default function Welded() {
  return (
    <ToggleGroup
      type="multiple"
      variant="outline"
      spacing={0}
      defaultValue={["bold"]}
      aria-label="Marks"
    >
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
