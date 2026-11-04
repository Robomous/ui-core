import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@robomous/ui-core";

const path = "s3://robomous-datasets/monterrey-dc2/pallet-detection/batch-0042/frames";

/** For text that is cut off, a slower `delayDuration` keeps the full value from flashing as the pointer passes. */
export default function Truncated() {
  return (
    <TooltipProvider delayDuration={500}>
      <div className="flex w-full max-w-xs items-baseline gap-3 rounded-lg border px-3 py-2">
        <span className="text-muted-foreground">Source</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0} className="min-w-0 truncate font-mono outline-none">
              {path}
            </span>
          </TooltipTrigger>
          <TooltipContent className="font-mono break-all">{path}</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
