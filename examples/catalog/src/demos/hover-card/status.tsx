import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@robomous/ui-core";

/** Any focusable control can trigger a hover card; here a camera name previews its live status. */
export default function Status() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="font-mono">
          warehouse-cam-04
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">warehouse-cam-04</span>
          <span className="text-muted-foreground">
            Online since 03:12 · last frame 2 seconds ago.
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
