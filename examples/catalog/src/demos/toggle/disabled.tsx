import { Toggle } from "@robomous/ui-core";
import { VideoIcon } from "@robomous/ui-core/icons";

/** A disabled Toggle keeps the state it had: off stays off, on stays on, and neither responds to a press. */
export default function Disabled() {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border">
      <div className="flex items-center gap-3 p-3">
        <img
          src="/assets/frames/dock.svg"
          alt=""
          loading="lazy"
          className="h-10 w-14 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-medium">cam-b07 · Dock A</span>
          <span className="text-muted-foreground">Off. Recording needs the Team plan.</span>
        </div>
        <Toggle variant="outline" disabled aria-label="Record cam-b07, unavailable">
          <VideoIcon />
        </Toggle>
      </div>
      <div className="flex items-center gap-3 border-t p-3">
        <img
          src="/assets/frames/dock-2.svg"
          alt=""
          loading="lazy"
          className="h-10 w-14 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-medium">cam-b09 · Loading bay</span>
          <span className="text-muted-foreground">On. Site policy requires recording.</span>
        </div>
        <Toggle variant="outline" defaultPressed disabled aria-label="Record cam-b09, locked on">
          <VideoIcon />
        </Toggle>
      </div>
    </div>
  );
}
