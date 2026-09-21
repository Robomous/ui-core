import { Kbd, KbdGroup } from "@robomous/ui-core";

/** KbdGroup holds a chord: the keys read together as one shortcut, not a list of separate ones. */
export default function Chord() {
  return (
    <div className="flex items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
  );
}
