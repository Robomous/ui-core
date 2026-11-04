import { Badge, Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@robomous/ui-core";
import { ImageIcon } from "@robomous/ui-core/icons";

const frames = [
  { name: "frame-000184.jpg", camera: "dock-cam-02", detections: 6 },
  { name: "frame-000185.jpg", camera: "dock-cam-02", detections: 4 },
  { name: "frame-000731.jpg", camera: "aisle-cam-14", detections: 11 },
];

/** `side="right"` keeps the preview clear of the list it came from, so the next row stays reachable. */
export default function Frame() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1 rounded-lg border p-1">
      <span className="px-2.5 py-1.5 text-muted-foreground tabular-nums">
        batch-0042 · 3 of 214 frames
      </span>
      <ul className="flex flex-col gap-0.5">
        {frames.map((frame) => (
          <li key={frame.name}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="w-full justify-start font-mono">
                  {frame.name}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent side="right" align="start" className="w-56">
                <div className="flex flex-col gap-2">
                  <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <ImageIcon className="size-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono">{frame.camera}</span>
                    <Badge variant="quiet" className="tabular-nums">
                      {frame.detections} boxes
                    </Badge>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
