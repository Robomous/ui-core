import { Progress } from "@robomous/ui-core";

/** The track is 4px by default; a `className` height thickens it where the bar is the main thing on screen. */
export default function Thickness() {
  return (
    <div className="grid w-full max-w-sm grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-5">
      <span className="text-muted-foreground">default</span>
      <Progress value={64} aria-label="Default thickness" />
      <span className="text-muted-foreground">h-2</span>
      <Progress value={64} className="h-2" aria-label="Medium thickness" />
      <span className="text-muted-foreground">h-3</span>
      <Progress value={64} className="h-3" aria-label="Large thickness" />
    </div>
  );
}
