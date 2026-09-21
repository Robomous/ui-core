import {
  Button,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";

/** A Kbd inside TooltipContent restyles itself onto the painted background automatically. */
export default function WithKbd() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Search</Button>
        </TooltipTrigger>
        <TooltipContent>
          Search
          <Kbd>⌘K</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
