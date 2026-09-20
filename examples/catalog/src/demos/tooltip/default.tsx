import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";

/** TooltipProvider owns the shared delayDuration (0 by default) for every Tooltip beneath it. */
export default function Default() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          Painted foreground-on-background, so it flips with the page.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
