import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
} from "@robomous/ui-core";
import { ChevronDownIcon } from "@robomous/ui-core/icons";

/** A separator marks the seam between two segments; it takes its orientation from the group. */
export default function Split() {
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/assets/people/daniel-okafor.svg" alt="" />
          <AvatarFallback>DO</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="font-medium">detector-v3.2</span>
          <div className="flex items-center gap-2">
            <Badge variant="success">Passed eval</Badge>
            <span className="text-muted-foreground tabular-nums">mAP 0.71</span>
          </div>
        </div>
      </div>
      <ButtonGroup>
        <Button variant="secondary">Deploy to staging</Button>
        <ButtonGroupSeparator />
        <Button variant="secondary" size="icon" aria-label="More deploy options">
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
