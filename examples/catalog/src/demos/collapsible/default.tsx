import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@robomous/ui-core";
import { ChevronsUpDownIcon } from "@robomous/ui-core/icons";

/** Unstyled on purpose: the trigger is whatever button it wraps through `asChild`. */
export default function Default() {
  return (
    <Collapsible className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Advanced filters</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle advanced filters">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-lg border px-3 py-2 font-mono text-sm">status: in_annotation</div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-lg border px-3 py-2 font-mono text-sm">assignee: me</div>
        <div className="rounded-lg border px-3 py-2 font-mono text-sm">labels: none</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
