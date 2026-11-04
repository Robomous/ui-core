import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@robomous/ui-core";
import { SearchIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const events = [
  {
    id: "1",
    who: "Daniel Okafor",
    initials: "DO",
    photo: "/assets/people/daniel-okafor.svg",
    text: "exported batch 0412 as COCO JSON",
    time: "2m ago",
  },
  {
    id: "2",
    who: "Sofia Brennan",
    initials: "SB",
    photo: "/assets/people/sofia-brennan.svg",
    text: "approved 212 annotations in batch 0411",
    time: "3h ago",
  },
  {
    id: "3",
    who: "Hannah Kim",
    initials: "HK",
    photo: "/assets/people/hannah-kim.svg",
    text: "rotated key rk_live_4f2a",
    time: "Oct 28",
  },
];

/** A filtered list with no matches: explain why it is empty, and let the reader undo the cause. */
export default function NoResults() {
  const [filtered, setFiltered] = useState(true);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex items-center justify-between gap-3">
        <CardTitle>Activity</CardTitle>
        <div className="flex items-center gap-1.5">
          {filtered ? (
            <>
              <Badge variant="secondary">Member: Mei Tanaka</Badge>
              <Badge variant="outline">Last 7 days</Badge>
            </>
          ) : (
            <Button variant="ghost" size="xs" onClick={() => setFiltered(true)}>
              Apply filters
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {filtered ? (
          <Empty className="border py-10">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchIcon />
              </EmptyMedia>
              <EmptyTitle>No events match these filters</EmptyTitle>
              <EmptyDescription>Try a different member, or widen the date range.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm" onClick={() => setFiltered(false)}>
                Clear filters
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <ul className="flex flex-col divide-y text-sm">
            {events.map(({ id, who, initials, photo, text, time }) => (
              <li key={id} className="flex items-center gap-3 py-2.5">
                <Avatar size="sm">
                  <AvatarImage src={photo} alt={who} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="min-w-0 flex-1 truncate">
                  <span className="font-medium">{who}</span> {text}
                </span>
                <span className="text-muted-foreground">{time}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
