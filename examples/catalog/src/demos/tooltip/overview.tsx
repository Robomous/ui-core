import {
  Button,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@robomous/ui-core";
import {
  BoxIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageIcon,
  MaximizeIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@robomous/ui-core/icons";
import type { ReactNode } from "react";

function Tip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

/** A frame viewer toolbar: every control is an icon, so each one gets a name on hover and focus. */
export default function Overview() {
  return (
    <TooltipProvider>
      <div className="w-full max-w-sm overflow-hidden rounded-lg border">
        <div
          role="toolbar"
          aria-label="Frame viewer"
          className="flex items-center gap-1 border-b p-1"
        >
          <Tip label="Previous frame">
            <Button variant="ghost" size="icon" aria-label="Previous frame">
              <ChevronLeftIcon />
            </Button>
          </Tip>
          <Tip label="Next frame">
            <Button variant="ghost" size="icon" aria-label="Next frame">
              <ChevronRightIcon />
            </Button>
          </Tip>
          <Separator orientation="vertical" className="mx-1 h-4" />
          <Tip label="Zoom out">
            <Button variant="ghost" size="icon" aria-label="Zoom out">
              <ZoomOutIcon />
            </Button>
          </Tip>
          <Tip label="Zoom in">
            <Button variant="ghost" size="icon" aria-label="Zoom in">
              <ZoomInIcon />
            </Button>
          </Tip>
          <Tip label="Fit to frame">
            <Button variant="ghost" size="icon" aria-label="Fit to frame">
              <MaximizeIcon />
            </Button>
          </Tip>
          <Separator orientation="vertical" className="mx-1 h-4" />
          <Tip label="Show boxes">
            <Button variant="ghost" size="icon" aria-label="Show boxes">
              <BoxIcon />
            </Button>
          </Tip>
        </div>
        <div className="flex aspect-video flex-col items-center justify-center gap-1 bg-muted text-muted-foreground">
          <ImageIcon className="size-6" />
          <span className="font-mono">frame-000184.jpg</span>
        </div>
      </div>
    </TooltipProvider>
  );
}
