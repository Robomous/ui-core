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
    </TooltipProvider>
  );
}
