import {
  Button,
  ButtonGroup,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";
import { MaximizeIcon, ZoomInIcon, ZoomOutIcon } from "@robomous/ui-core/icons";

/** TooltipProvider owns the shared delayDuration (0 by default) for every Tooltip beneath it. */
export default function Default() {
  return (
    <TooltipProvider>
      <ButtonGroup aria-label="Frame viewer">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Zoom out">
              <ZoomOutIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom out</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Zoom in">
              <ZoomInIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom in</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Fit to frame">
              <MaximizeIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Fit to frame</TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </TooltipProvider>
  );
}
