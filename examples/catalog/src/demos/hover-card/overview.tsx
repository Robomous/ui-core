import {
  Avatar,
  AvatarFallback,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@robomous/ui-core";

type Person = {
  name: string;
  initials: string;
  role: string;
  bio: string;
  annotations: string;
  reviews: string;
};

const aisha: Person = {
  name: "Aisha Bello",
  initials: "AB",
  role: "Admin",
  bio: "Owns the review queue for Monterrey DC-2 and approves exports.",
  annotations: "12,480",
  reviews: "342",
};
const tomas: Person = {
  name: "Tomás Rivera",
  initials: "TR",
  role: "Annotator",
  bio: "Labels pallets and forklifts, mostly night shift footage.",
  annotations: "8,915",
  reviews: "27",
};
const lena: Person = {
  name: "Lena Fischer",
  initials: "LF",
  role: "ML engineer",
  bio: "Trains the detector family and owns the export pipeline.",
  annotations: "640",
  reviews: "118",
};

const events = [
  { person: aisha, action: "approved batch-0042", time: "2 min ago" },
  { person: tomas, action: "flagged 14 frames in batch-0041", time: "18 min ago" },
  { person: lena, action: "exported pallet-detection as COCO", time: "1 hour ago" },
];

function PersonLink({ person }: { person: Person }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-sm font-medium">
          {person.name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <Avatar size="lg">
              <AvatarFallback>{person.initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{person.name}</span>
              <span className="text-muted-foreground">{person.role}</span>
            </div>
          </div>
          <p>{person.bio}</p>
          <dl className="flex gap-6 border-t pt-2.5 tabular-nums">
            <div>
              <dt className="text-muted-foreground">Annotations</dt>
              <dd className="font-medium">{person.annotations}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Reviews</dt>
              <dd className="font-medium">{person.reviews}</dd>
            </div>
          </dl>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

/** An activity feed where each name is a real, focusable control that also previews the person on hover. */
export default function Overview() {
  return (
    <ul className="w-full max-w-lg divide-y rounded-lg border text-sm">
      {events.map(({ person, action, time }) => (
        <li key={action} className="flex items-center justify-between gap-4 px-4 py-3">
          <span className="flex flex-wrap items-baseline gap-x-1">
            <PersonLink person={person} />
            <span>{action}</span>
          </span>
          <span className="shrink-0 text-muted-foreground tabular-nums">{time}</span>
        </li>
      ))}
    </ul>
  );
}
