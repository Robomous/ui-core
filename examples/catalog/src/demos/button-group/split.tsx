import { Button, ButtonGroup, ButtonGroupSeparator } from "@robomous/ui-core";
import { ChevronDownIcon } from "@robomous/ui-core/icons";

/** ButtonGroupSeparator is a Separator underneath: it inherits its orientation from the group instead of setting one. */
export default function Split() {
  return (
    <ButtonGroup>
      <Button variant="outline">Publish</Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon" aria-label="More publish options">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  );
}
