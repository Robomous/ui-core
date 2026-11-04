import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from "@robomous/ui-core";
import { ChevronsUpDownIcon } from "@robomous/ui-core/icons";

const visible = [["learning_rate", "3e-4"]];
const folded = [
  ["batch_size", "32"],
  ["epochs", "120"],
  ["weight_decay", "0.01"],
  ["warmup_epochs", "3"],
];

/** Unstyled on purpose: the trigger is whatever button it wraps through `asChild`. */
export default function Default() {
  return (
    <Collapsible className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">Hyperparameters · run-0419</span>
          <span className="text-muted-foreground tabular-nums">
            {visible.length + folded.length} settings · 1 shown
          </span>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle hyperparameters">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <dl className="flex flex-col gap-2 font-mono text-xs">
        {visible.map(([name, value]) => (
          <div key={name} className="flex justify-between gap-4 rounded-md border px-3 py-2">
            <dt className="text-muted-foreground">{name}</dt>
            <dd className="tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      <CollapsibleContent>
        <dl className="flex flex-col gap-2 font-mono text-xs">
          {folded.map(([name, value]) => (
            <div key={name} className="flex justify-between gap-4 rounded-md border px-3 py-2">
              <dt className="text-muted-foreground">{name}</dt>
              <dd className="tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </CollapsibleContent>
    </Collapsible>
  );
}
