import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  ScrollArea,
  Separator,
} from "@robomous/ui-core";

const members = [
  ["Lena Fischer", "Owner"],
  ["Ravi Shah", "Admin"],
  ["Daniel Okafor", "Admin"],
  ["Sofia Brennan", "Annotator"],
  ["Mei Tanaka", "Annotator"],
  ["Lucas Moreau", "Annotator"],
  ["Jonas Weber", "Reviewer"],
  ["Hannah Kim", "Reviewer"],
  ["Tom Becker", "Viewer"],
  ["Amara Diallo", "Viewer"],
] as const;

const portrait = (name: string) => `/assets/people/${name.toLowerCase().replace(" ", "-")}.svg`;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

/** Keep what must stay visible outside the ScrollArea: a sibling above it never scrolls away. */
export default function FixedHeader() {
  return (
    <div className="flex w-full max-w-sm flex-col rounded-lg border">
      <div className="flex items-baseline justify-between px-3 py-2">
        <span className="font-medium">Team</span>
        <span className="text-muted-foreground tabular-nums">{members.length} members</span>
      </div>
      <Separator />
      <ScrollArea className="h-48">
        <ul className="flex flex-col p-1">
          {members.map(([name, role]) => (
            <li key={name} className="flex items-center justify-between rounded-md px-2 py-1.5">
              <span className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarImage src={portrait(name)} alt="" />
                  <AvatarFallback>{initials(name)}</AvatarFallback>
                </Avatar>
                {name}
              </span>
              <Badge variant="quiet">{role}</Badge>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
