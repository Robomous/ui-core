import { Badge, Button } from "@robomous/ui-core";
import { ArrowLeftIcon, ArrowRightIcon, KeyRoundIcon } from "@robomous/ui-core/icons";

/** An icon reads as part of the label: `data-icon` tells the button which side to pad. */
export default function WithIcon() {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border">
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">API keys</span>
          <span className="text-muted-foreground">3 active · last used 2 h ago</span>
        </div>
        <Button size="sm">
          <KeyRoundIcon data-icon="inline-start" />
          New key
        </Button>
      </div>
      <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono">rk_live_…8f2a</span>
          <span className="text-muted-foreground tabular-nums">Created Oct 28, 14:32</span>
        </div>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="flex items-center justify-between gap-3 border-t bg-muted/40 p-3">
        <Button variant="ghost">
          <ArrowLeftIcon data-icon="inline-start" />
          Back
        </Button>
        <Button variant="outline">
          Next: permissions
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </div>
  );
}
