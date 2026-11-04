import {
  Badge,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@robomous/ui-core";
import { ChevronsUpDownIcon } from "@robomous/ui-core/icons";

/** `disabled` on the root keeps the region shut and the trigger inert; say why nearby. */
export default function Disabled() {
  return (
    <Collapsible disabled className="flex w-full max-w-sm flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="flex items-center gap-2 text-sm font-medium">
            Evaluation report
            <Badge variant="info">running</Badge>
          </span>
          <span className="text-muted-foreground">
            Available once run-0419 finishes, about 2h from now.
          </span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle evaluation report">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        Per-class precision and recall for pallet, forklift, person, box and damaged-box.
      </CollapsibleContent>
    </Collapsible>
  );
}
