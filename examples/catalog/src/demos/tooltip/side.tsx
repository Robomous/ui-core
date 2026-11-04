import {
  Button,
  ButtonGroup,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";
import { BoxIcon, HandIcon, MousePointer2Icon } from "@robomous/ui-core/icons";

/** `side` picks which edge the content opens from; the arrow and slide-in direction follow. */
export default function Side() {
  return (
    <TooltipProvider>
      <div className="flex w-full max-w-sm items-start gap-3 rounded-lg border p-2">
        <ButtonGroup orientation="vertical" aria-label="Annotation tools">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Select">
                <MousePointer2Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Select</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Bounding box">
                <BoxIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Bounding box</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Pan">
                <HandIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Pan</TooltipContent>
          </Tooltip>
        </ButtonGroup>
        <div className="flex aspect-video flex-1 flex-col items-center justify-center gap-1 rounded-md bg-muted text-muted-foreground">
          <span className="font-mono">frame-000184.jpg</span>
          <span className="tabular-nums">6 boxes</span>
        </div>
      </div>
    </TooltipProvider>
  );
}
