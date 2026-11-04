import { Button, Kbd, KbdGroup } from "@robomous/ui-core";
import { SaveIcon } from "@robomous/ui-core/icons";
import { useEffect, useState } from "react";

/** Keycaps are text, so they can follow the platform: ⌘ on a Mac, Ctrl everywhere else. */
export default function Platform() {
  const [modifier, setModifier] = useState("Ctrl");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setModifier("⌘");
  }, []);

  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-4 rounded-lg border p-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">12 unsaved boxes</span>
        <span className="text-muted-foreground">frame-0418 of 2,350 · pallet-detection</span>
      </div>
      <Button variant="outline">
        <SaveIcon data-icon="inline-start" />
        Save
        <KbdGroup data-icon="inline-end">
          <Kbd>{modifier}</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </Button>
    </div>
  );
}
