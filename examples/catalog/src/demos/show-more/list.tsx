import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ShowMore,
  ShowMoreTrigger,
} from "@robomous/ui-core";
import { useState } from "react";

const events = [
  ["Lena Fischer", "invited jonas.weber@robomous.ai as Reviewer", "2m"],
  ["Sofia Brennan", "exported batch 38 as COCO JSON", "18m"],
  ["Hannah Kim", "rotated the ci-deploy key rk_live_…a41f", "1h"],
  ["Lena Fischer", "changed retention at Monterrey DC-2 to 30 days", "3h"],
  ["Daniel Okafor", "started run-0419 on detector-v3.2", "5h"],
  ["Ravi Shah", "enabled SSO enforcement", "1d"],
] as const;

const portrait = (name: string) => `/assets/people/${name.toLowerCase().replace(" ", "-")}.svg`;

/** Without `ShowMoreContent`, the trigger drives a list the caller slices itself. */
export default function List() {
  const [open, setOpen] = useState(false);
  const shown = open ? events : events.slice(0, 3);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Team activity</CardTitle>
        <CardDescription>Latest changes across the workspace</CardDescription>
      </CardHeader>
      <CardContent>
        <ShowMore open={open} onOpenChange={setOpen}>
          <ul className="flex flex-col divide-y">
            {shown.map(([actor, action, when]) => (
              <li key={actor + action} className="flex items-center gap-3 py-2.5">
                <Avatar size="sm">
                  <AvatarImage src={portrait(actor)} alt="" />
                  <AvatarFallback>
                    {actor
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="min-w-0 flex-1 truncate">
                  <span className="font-medium">{actor}</span>{" "}
                  <span className="text-muted-foreground">{action}</span>
                </span>
                <span className="text-muted-foreground tabular-nums">{when}</span>
              </li>
            ))}
          </ul>
          <ShowMoreTrigger moreLabel={`Show ${events.length - 3} more`} lessLabel="Show fewer" />
        </ShowMore>
      </CardContent>
    </Card>
  );
}
