import { Toggle } from "@robomous/ui-core";
import { TagIcon } from "@robomous/ui-core/icons";

/** `aria-pressed` carries the state; `outline` adds a border so a toolbar with no track still reads as controls. */
export default function Variants() {
  return (
    <div className="grid w-fit grid-cols-[4.5rem_3.5rem_3.5rem_auto] items-center justify-items-center gap-x-6 gap-y-4">
      <span />
      <span className="text-muted-foreground">off</span>
      <span className="text-muted-foreground">on</span>
      <span />
      <span className="justify-self-start text-muted-foreground">default</span>
      <Toggle aria-label="Show labels">
        <TagIcon />
      </Toggle>
      <Toggle defaultPressed aria-label="Show labels, pressed">
        <TagIcon />
      </Toggle>
      <span className="justify-self-start text-muted-foreground">Flush until pressed</span>
      <span className="justify-self-start text-muted-foreground">outline</span>
      <Toggle variant="outline" aria-label="Show labels, outline">
        <TagIcon />
      </Toggle>
      <Toggle variant="outline" defaultPressed aria-label="Show labels, outline pressed">
        <TagIcon />
      </Toggle>
      <span className="justify-self-start text-muted-foreground">Bordered in both states</span>
    </div>
  );
}
