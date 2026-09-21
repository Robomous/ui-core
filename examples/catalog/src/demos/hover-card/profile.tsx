import {
  Avatar,
  AvatarFallback,
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@robomous/ui-core";

/** The trigger is a real, focusable control: the preview is additive, never the only way to it. */
export default function Profile() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@robomous</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-2.5">
          <Avatar>
            <AvatarFallback>RO</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">Robomous</span>
            <span className="text-muted-foreground">Vision tooling. Joined 2026.</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
