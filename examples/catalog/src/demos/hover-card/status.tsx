import {
  Badge,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Item,
  ItemContent,
  ItemMedia,
} from "@robomous/ui-core";
import { CpuIcon, RocketIcon } from "@robomous/ui-core/icons";

/** Any focusable control can open a card; here a model name inside a sentence previews its live endpoint. */
export default function Status() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemMedia variant="icon">
        <RocketIcon />
      </ItemMedia>
      <ItemContent>
        <p className="text-sm">
          Deployed{" "}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link" className="h-auto p-0 font-mono text-sm">
                detector-v3.2
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <CpuIcon className="size-4" />
                  </span>
                  <span className="flex-1 font-mono font-medium">detector-v3.2</span>
                  <Badge variant="success">Live</Badge>
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 tabular-nums">
                  <dt className="text-muted-foreground">mAP</dt>
                  <dd className="text-right">0.71</dd>
                  <dt className="text-muted-foreground">p95 latency</dt>
                  <dd className="text-right">84 ms</dd>
                  <dt className="text-muted-foreground">Requests</dt>
                  <dd className="text-right">12.4k per hour</dd>
                </dl>
              </div>
            </HoverCardContent>
          </HoverCard>{" "}
          to Monterrey DC-2 today.
        </p>
      </ItemContent>
    </Item>
  );
}
