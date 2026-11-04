import {
  Button,
  ButtonGroup,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";
import { BotIcon, HouseIcon, OctagonXIcon, PauseIcon } from "@robomous/ui-core/icons";

/** One provider above the group; each control keeps its own `aria-label` and the tooltip repeats it. */
export default function Default() {
  return (
    <TooltipProvider>
      <Item variant="outline" className="w-full max-w-md">
        <ItemMedia variant="icon">
          <BotIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            <span className="font-mono">rb-07</span> Atlas
          </ItemTitle>
          <ItemDescription>Mission 0412 · 64%</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ButtonGroup aria-label="rb-07 controls">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Pause mission">
                  <PauseIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pause mission</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Return to dock">
                  <HouseIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Return to dock</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Emergency stop">
                  <OctagonXIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Emergency stop</TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </ItemActions>
      </Item>
    </TooltipProvider>
  );
}
