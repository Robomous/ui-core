import { ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "@robomous/ui-core/icons";

/** `type="multiple"` behaves like independent pressed buttons: any number can stay on. */
export default function Multiple() {
  return (
    <ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="Marks">
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
