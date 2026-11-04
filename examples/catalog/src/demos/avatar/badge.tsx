import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@robomous/ui-core";

const people = [
  {
    initials: "LM",
    image: "/assets/people/lucas-moreau.svg",
    name: "Lucas Moreau",
    status: "Online, annotating batch 0413",
    color: "bg-success",
  },
  {
    initials: "TB",
    image: "/assets/people/tom-becker.svg",
    name: "Tom Becker",
    status: "Reviewing batch 0412",
    color: "bg-warning",
  },
  {
    initials: "MR",
    image: "/assets/people/mateo-ruiz.svg",
    name: "Mateo Ruiz",
    status: "Offline since 18:10",
    color: "bg-muted-foreground",
  },
];

/** `AvatarBadge` sits over the corner and scales with the avatar's size; its colour says the status, and the visible text says it again. */
export default function Badge() {
  return (
    <ul className="flex w-full max-w-xs flex-col divide-y rounded-lg border">
      {people.map((person) => (
        <li key={person.name} className="flex items-center gap-3 px-3 py-2.5">
          <Avatar>
            <AvatarImage src={person.image} alt="" />
            <AvatarFallback>{person.initials}</AvatarFallback>
            <AvatarBadge className={person.color} />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{person.name}</span>
            <span className="text-muted-foreground">{person.status}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
