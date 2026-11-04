import {
  Button,
  Kbd,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";
import { MaximizeIcon, ZoomInIcon, ZoomOutIcon } from "@robomous/ui-core/icons";

const tools = [
  { label: "Zoom out", key: "-", icon: ZoomOutIcon },
  { label: "Zoom in", key: "+", icon: ZoomInIcon },
  { label: "Full screen", key: "F", icon: MaximizeIcon },
];

/** Inside a TooltipContent, Kbd's own background and text recolour to sit on the tooltip's fill: here the shortcuts of an icon-only viewer toolbar. */
export default function InTooltip() {
  return (
    <TooltipProvider>
      <div className="relative w-full max-w-sm overflow-hidden rounded-lg">
        <img
          src="/assets/frames/dock.svg"
          alt="Frame from cam-b07 on Dock A: four roll-up doors, staged pallets and two workers"
          loading="lazy"
          className="aspect-video w-full object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div
          role="toolbar"
          aria-label="Viewer controls"
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-lg border bg-background p-1 shadow-sm"
        >
          {tools.map(({ label, key, icon: Icon }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={label}>
                  <Icon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {label} <Kbd>{key}</Kbd>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
