import { Toggle } from "@robomous/ui-core";
import { BellIcon } from "@robomous/ui-core/icons";

/** Three heights, matched to the buttons and inputs that sit beside a Toggle. */
export default function Sizes() {
  return (
    <div className="flex w-fit items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="outline" size="sm" defaultPressed aria-label="Low battery alerts, small">
          <BellIcon />
        </Toggle>
        <span className="text-muted-foreground">sm · 24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="outline" defaultPressed aria-label="Low battery alerts">
          <BellIcon />
        </Toggle>
        <span className="text-muted-foreground">default · 28px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Toggle variant="outline" size="lg" defaultPressed aria-label="Low battery alerts, large">
          <BellIcon />
        </Toggle>
        <span className="text-muted-foreground">lg · 32px</span>
      </div>
    </div>
  );
}
