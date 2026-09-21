import { Kbd } from "@robomous/ui-core";

/** A real <kbd>, sized to sit inline with body text rather than as a boxed control. */
export default function Single() {
  return (
    <div className="flex items-center gap-2">
      <Kbd>Esc</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
    </div>
  );
}
