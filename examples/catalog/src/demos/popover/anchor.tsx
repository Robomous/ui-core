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
    <Popover>
      <div className="flex items-center gap-1.5">
        <PopoverAnchor asChild>
          <span className="font-mono text-sm">warehouse-cam-04</span>
        </PopoverAnchor>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Camera details">
            <InfoIcon />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-72" align="start">
        <PopoverHeader>
          <PopoverTitle className="flex items-center justify-between">
            Camera status
            <Badge variant="success">Online</Badge>
          </PopoverTitle>
          <PopoverDescription>Streaming to batch-0042 since 03:12.</PopoverDescription>
        </PopoverHeader>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 tabular-nums">
          <dt className="text-muted-foreground">Resolution</dt>
          <dd className="text-right">1920 × 1080</dd>
          <dt className="text-muted-foreground">Frame rate</dt>
          <dd className="text-right">30 fps</dd>
          <dt className="text-muted-foreground">Last frame</dt>
          <dd className="text-right">2 s ago</dd>
        </dl>
      </PopoverContent>
    </Popover>
  );
}
