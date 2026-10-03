import { Badge, Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@robomous/ui-core";
import { VideoIcon } from "@robomous/ui-core/icons";

/** Any focusable control can trigger a hover card; here a camera name previews its live status. */
export default function Status() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="font-mono">
          warehouse-cam-04
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <VideoIcon className="size-4" />
            </span>
            <span className="flex-1 font-mono font-medium">warehouse-cam-04</span>
            <Badge variant="success">Online</Badge>
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 tabular-nums">
            <dt className="text-muted-foreground">Resolution</dt>
            <dd className="text-right">1920 × 1080</dd>
            <dt className="text-muted-foreground">Frame rate</dt>
            <dd className="text-right">30 fps</dd>
            <dt className="text-muted-foreground">Last frame</dt>
            <dd className="text-right">2 s ago</dd>
          </dl>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
