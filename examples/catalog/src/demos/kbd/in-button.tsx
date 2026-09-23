import { Button, Kbd, KbdGroup } from "@robomous/ui-core";

/** data-icon="inline-end" pads a KbdGroup the same way it pads an icon, so the shortcut sits at the label's edge. */
export default function InButton() {
  return (
    <Button variant="outline">
      Search datasets
      <KbdGroup data-icon="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </Button>
  );
}
