import {
  Button,
  ButtonGroup,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";
import { RedoIcon, SaveIcon, UndoIcon } from "@robomous/ui-core/icons";

/** A Kbd inside TooltipContent restyles itself onto the painted background automatically. */
export default function WithKbd() {
  return (
    <TooltipProvider>
      <ButtonGroup aria-label="Annotation history">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Undo">
              <UndoIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Undo
            <Kbd>⌘Z</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Redo">
              <RedoIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Redo
            <Kbd>⇧⌘Z</Kbd>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Save">
              <SaveIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Save
            <Kbd>⌘S</Kbd>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </TooltipProvider>
  );
}
