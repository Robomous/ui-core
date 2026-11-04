import { Button, ButtonGroup } from "@robomous/ui-core";
import { MinusIcon, PlusIcon } from "@robomous/ui-core/icons";

/** The group has no size of its own: every segment takes the `size` you give its Button. */
export default function Sizes() {
  return (
    <div className="grid w-fit grid-cols-[4rem_auto_auto] items-center gap-x-8 gap-y-4">
      <span className="text-muted-foreground">sm</span>
      <ButtonGroup aria-label="Zoom, small">
        <Button variant="outline" size="icon-sm" aria-label="Zoom out">
          <MinusIcon />
        </Button>
        <Button variant="outline" size="sm" className="min-w-12 tabular-nums">
          100%
        </Button>
        <Button variant="outline" size="icon-sm" aria-label="Zoom in">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <span className="text-muted-foreground">icon-sm · sm · icon-sm</span>
      <span className="text-muted-foreground">default</span>
      <ButtonGroup aria-label="Zoom, default">
        <Button variant="outline" size="icon" aria-label="Zoom out">
          <MinusIcon />
        </Button>
        <Button variant="outline" className="min-w-12 tabular-nums">
          100%
        </Button>
        <Button variant="outline" size="icon" aria-label="Zoom in">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <span className="text-muted-foreground">icon · default · icon</span>
      <span className="text-muted-foreground">lg</span>
      <ButtonGroup aria-label="Zoom, large">
        <Button variant="outline" size="icon-lg" aria-label="Zoom out">
          <MinusIcon />
        </Button>
        <Button variant="outline" size="lg" className="min-w-12 tabular-nums">
          100%
        </Button>
        <Button variant="outline" size="icon-lg" aria-label="Zoom in">
          <PlusIcon />
        </Button>
      </ButtonGroup>
      <span className="text-muted-foreground">icon-lg · lg · icon-lg</span>
    </div>
  );
}
