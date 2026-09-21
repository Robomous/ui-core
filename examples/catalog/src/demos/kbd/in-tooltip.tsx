import {
  Button,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";

/** Inside a TooltipContent, Kbd's own background and text recolour to sit on the tooltip's fill. */
export default function InTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Rename
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Rename <Kbd>F2</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
