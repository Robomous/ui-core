import { Button, Kbd, KbdGroup } from "@robomous/ui-core";
import { CheckIcon, SearchIcon } from "@robomous/ui-core/icons";

/** data-icon="inline-end" pads a KbdGroup the same way it pads an icon, so the shortcut sits at the label's edge. */
export default function InButton() {
  return (
    <div className="flex w-fit flex-wrap items-center justify-center gap-2">
      <Button variant="outline">
        <SearchIcon data-icon="inline-start" />
        Search robots
        <KbdGroup data-icon="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <Button variant="outline">
        <CheckIcon data-icon="inline-start" />
        Approve frame
        <KbdGroup data-icon="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>Enter</Kbd>
        </KbdGroup>
      </Button>
    </div>
  );
}
