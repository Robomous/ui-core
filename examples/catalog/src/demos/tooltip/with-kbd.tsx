import {
  Button,
  ButtonGroup,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";
import { CheckIcon, ImageIcon, SkipForwardIcon, XIcon } from "@robomous/ui-core/icons";

/** A Kbd inside TooltipContent restyles itself onto the dark surface: no prop to set. */
export default function WithKbd() {
  return (
    <TooltipProvider>
      <div className="flex w-full max-w-xs flex-col gap-3 rounded-lg border p-2">
        <div className="flex aspect-video flex-col items-center justify-center gap-1 rounded-md bg-muted text-muted-foreground">
          <ImageIcon className="size-6" />
          <span className="font-mono">frame-000731.jpg</span>
        </div>
        <div className="flex justify-center pb-1">
          <ButtonGroup aria-label="Review actions">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Approve">
                  <CheckIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Approve
                <Kbd>A</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Reject">
                  <XIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Reject
                <Kbd>R</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Skip">
                  <SkipForwardIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Skip
                <Kbd>S</Kbd>
              </TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </div>
      </div>
    </TooltipProvider>
  );
}
