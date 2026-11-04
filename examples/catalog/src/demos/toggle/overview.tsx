import { Avatar, AvatarFallback, AvatarImage, Badge, Toggle } from "@robomous/ui-core";
import { BellIcon, StarIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** A run header: each Toggle is an independent on/off preference, and the label stays put while it flips. */
export default function Overview() {
  const [watching, setWatching] = useState(true);

  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarImage src="/assets/people/daniel-okafor.svg" alt="" />
          <AvatarFallback>DO</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">run-0412</span>
            <Badge variant="info">Running · 62%</Badge>
          </div>
          <span className="text-muted-foreground">
            {watching ? "You'll be notified when it finishes" : "Not watching this run"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Toggle variant="outline" aria-label="Pin run">
          <StarIcon />
        </Toggle>
        <Toggle variant="outline" pressed={watching} onPressedChange={setWatching}>
          <BellIcon data-icon="inline-start" />
          Watch
        </Toggle>
      </div>
    </div>
  );
}
