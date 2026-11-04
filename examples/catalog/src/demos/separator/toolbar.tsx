import { Button, Separator } from "@robomous/ui-core";
import {
  BoxIcon,
  HandIcon,
  MousePointer2Icon,
  Redo2Icon,
  Undo2Icon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@robomous/ui-core/icons";

/** Vertical rules split a dense toolbar into groups, so the reader finds tools by cluster instead of by scanning. */
export default function Toolbar() {
  return (
    <div className="flex w-fit flex-col items-center gap-3">
      <div
        role="toolbar"
        aria-label="Annotation tools"
        className="flex h-9 items-center gap-1.5 rounded-lg border px-1"
      >
        <Button variant="ghost" size="icon-sm" aria-label="Select">
          <MousePointer2Icon />
        </Button>
        <Button variant="secondary" size="icon-sm" aria-label="Draw box" aria-pressed="true">
          <BoxIcon />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Pan">
          <HandIcon />
        </Button>
        <Separator orientation="vertical" className="h-4 data-vertical:self-center" />
        <Button variant="ghost" size="icon-sm" aria-label="Undo">
          <Undo2Icon />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Redo">
          <Redo2Icon />
        </Button>
        <Separator orientation="vertical" className="h-4 data-vertical:self-center" />
        <Button variant="ghost" size="icon-sm" aria-label="Zoom out">
          <ZoomOutIcon />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Zoom in">
          <ZoomInIcon />
        </Button>
      </div>
      <span className="text-muted-foreground">Tools · History · View</span>
    </div>
  );
}
