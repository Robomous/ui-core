import { ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@robomous/ui-core/icons";

/** `type="single"` behaves like radios: exactly one segment stays pressed. */
export default function Single() {
  return (
    <ToggleGroup type="single" defaultValue="left" aria-label="Alignment">
      <ToggleGroupItem value="left" aria-label="Left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Centre">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
