import { Avatar, AvatarFallback, AvatarImage } from "@robomous/ui-core";
import { BotIcon } from "@robomous/ui-core/icons";

const events = [
  {
    initials: "LF",
    image: "/assets/people/lena-fischer.svg",
    name: "Lena Fischer",
    action: "approved batch 0411 of pallet-detection",
    time: "Oct 28, 14:32",
  },
  {
    initials: "SB",
    image: "/assets/people/sofia-brennan.svg",
    name: "Sofia Brennan",
    action: "flagged 14 frames in batch 0412 for relabeling",
    time: "Oct 28, 13:05",
  },
  {
    initials: null,
    image: null,
    name: "Auto-QA",
    action: "found 3 duplicate boxes in batch 0412",
    time: "Oct 28, 10:47",
  },
];

/** An activity feed: each event leads with an avatar, and the automated actor gets an icon where a person's initials would go. */
export default function Overview() {
  return (
    <ul className="flex w-full max-w-md flex-col gap-5">
      {events.map((event) => (
        <li key={event.name} className="flex items-start gap-3">
          <Avatar>
            {event.image && <AvatarImage src={event.image} alt="" />}
            <AvatarFallback>{event.initials ?? <BotIcon className="size-4" />}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p className="text-pretty">
              <span className="font-medium">{event.name}</span> {event.action}
            </p>
            <span className="text-muted-foreground tabular-nums">{event.time}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
