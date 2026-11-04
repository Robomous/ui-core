import { Button } from "@robomous/ui-core";

/** Four text heights on one baseline; the small sizes step down the radius scale with them. */
export default function Sizes() {
  return (
    <div className="flex w-fit items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Button size="xs">Retry</Button>
        <span className="text-muted-foreground">xs · 20px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button size="sm">Export</Button>
        <span className="text-muted-foreground">sm · 24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button>Save changes</Button>
        <span className="text-muted-foreground">default · 28px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button size="lg">Start training</Button>
        <span className="text-muted-foreground">lg · 32px</span>
      </div>
    </div>
  );
}
