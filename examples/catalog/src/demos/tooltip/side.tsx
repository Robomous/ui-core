import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";

/** `side` picks which edge the content opens from; the arrow and slide-in direction follow. */
export default function Side() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Camera 04</Button>
        </TooltipTrigger>
        <TooltipContent side="right">Offline since 02:14</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
