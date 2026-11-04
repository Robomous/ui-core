import {
  Button,
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
import { CpuIcon, RocketIcon } from "@robomous/ui-core/icons";

/** A disabled button receives no pointer or focus events, so a focusable wrapper carries the tooltip. */
export default function Disabled() {
  return (
    <TooltipProvider>
      <Item variant="outline" className="w-full max-w-md">
        <ItemMedia variant="icon">
          <CpuIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="font-mono">detector-v3.2</ItemTitle>
          <ItemDescription className="tabular-nums">Evaluating · 62%</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                <Button disabled size="sm">
                  <RocketIcon data-icon="inline-start" />
                  Deploy
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>Evaluation must finish before this model can deploy</TooltipContent>
          </Tooltip>
        </ItemActions>
      </Item>
    </TooltipProvider>
  );
}
