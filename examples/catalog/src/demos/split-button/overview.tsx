import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  DropdownMenuGroup,
  DropdownMenuItem,
  SplitButton,
} from "@robomous/ui-core";
import { RocketIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** A model's release bar: the safe default is one click, its close variants sit behind the chevron. */
export default function Overview() {
  const [status, setStatus] = useState("Not deployed");

  return (
    <div className="flex w-full max-w-lg items-center justify-between gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage src="/assets/people/daniel-okafor.svg" alt="" />
          <AvatarFallback>DO</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">detector-v3.2</span>
          <span className="text-muted-foreground">Daniel Okafor · mAP 0.71</span>
          <Badge variant={status === "Not deployed" ? "quiet" : "success"} className="w-fit">
            {status}
          </Badge>
        </div>
      </div>
      <SplitButton
        icon={<RocketIcon data-icon="inline-start" />}
        label="Deploy"
        menuLabel="More deploy options"
        menuAlign="end"
        onClick={() => setStatus("Live in production")}
      >
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => setStatus("Live in production")}>
            Deploy
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setStatus("Live in staging")}>
            Deploy to Staging
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setStatus("Canary at 10% of traffic")}>
            Deploy as Canary
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </SplitButton>
    </div>
  );
}
