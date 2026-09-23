import { ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@robomous/ui-core/icons";

/** `orientation="vertical"` stacks the segments and stretches them to one width. */
export default function Vertical() {
  return (
    <ToggleGroup
      type="single"
      orientation="vertical"
      defaultValue="left"
      aria-label="Alignment"
      className="w-9"
    >
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
