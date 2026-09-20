import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@robomous/ui-core";
import { InfoIcon } from "lucide-react";

/** PopoverAnchor positions the content against a different element than the one that opens it. */
export default function Anchor() {
  return (
    <Popover>
      <div className="flex items-center gap-2">
        <PopoverAnchor asChild>
          <span className="font-mono text-sm">warehouse-cam-04</span>
        </PopoverAnchor>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Camera details">
            <InfoIcon />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>warehouse-cam-04</PopoverTitle>
          <PopoverDescription>Online since 03:12. Last frame 2 seconds ago.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
