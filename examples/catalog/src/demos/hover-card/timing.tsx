import {
  Avatar,
  AvatarFallback,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@robomous/ui-core";

const reviewers = [
  { initials: "AB", name: "Aisha Bello", detail: "Approved 3 batches today" },
  { initials: "TR", name: "Tomás Rivera", detail: "Reviewing batch-0041" },
  { initials: "LF", name: "Lena Fischer", detail: "Last active yesterday" },
];

/** Defaults are `openDelay` 700 and `closeDelay` 300; a dense row of faces wants them shorter. */
export default function Timing() {
  return (
    <Item variant="outline" className="w-full max-w-md">
      <ItemContent>
        <ItemTitle className="font-mono">batch-0042</ItemTitle>
        <ItemDescription>3 reviewers</ItemDescription>
      </ItemContent>
      <div className="flex gap-1">
        {reviewers.map((reviewer) => (
          <HoverCard key={reviewer.name} openDelay={100} closeDelay={100}>
            <HoverCardTrigger asChild>
              <button
                type="button"
                aria-label={reviewer.name}
                className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Avatar>
                  <AvatarFallback>{reviewer.initials}</AvatarFallback>
                </Avatar>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-56">
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{reviewer.name}</span>
                <span className="text-muted-foreground">{reviewer.detail}</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </Item>
  );
}
