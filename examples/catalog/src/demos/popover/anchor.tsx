import {
  Badge,
  Button,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@robomous/ui-core";
import { InfoIcon } from "@robomous/ui-core/icons";

/** PopoverAnchor positions the content against a different element than the one that opens it. */
export default function Anchor() {
  return (
    <div className="flex w-full max-w-md items-center gap-3 rounded-xl border bg-card p-2.5 pr-2.5">
      <img
        src="/assets/frames/aisle-2.svg"
        alt="Latest frame from cam-02: two workers in a racking aisle"
        loading="lazy"
        className="h-12 w-[4.5rem] shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
      />
      <Popover>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <PopoverAnchor asChild>
            <span className="w-fit font-mono text-sm font-medium">cam-02</span>
          </PopoverAnchor>
          <span className="truncate text-muted-foreground">Aisle 14 · Monterrey DC-2</span>
        </div>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Camera details">
            <InfoIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="start">
          <PopoverHeader>
            <PopoverTitle className="flex items-center justify-between">
              Camera status
              <Badge variant="success">Online</Badge>
            </PopoverTitle>
            <PopoverDescription>Monterrey DC-2, streaming since 03:12.</PopoverDescription>
          </PopoverHeader>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 tabular-nums">
            <dt className="text-muted-foreground">Resolution</dt>
            <dd className="text-right">1920 × 1080</dd>
            <dt className="text-muted-foreground">Frame rate</dt>
            <dd className="text-right">15 fps</dd>
            <dt className="text-muted-foreground">Retention</dt>
            <dd className="text-right">30 days</dd>
            <dt className="text-muted-foreground">Last frame</dt>
            <dd className="text-right">2 s ago</dd>
          </dl>
        </PopoverContent>
      </Popover>
    </div>
  );
}
