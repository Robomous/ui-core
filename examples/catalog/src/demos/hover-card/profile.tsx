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
        <Button variant="link">@maria.lopez</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <Avatar size="lg">
              <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">Maria Lopez</span>
              <span className="text-muted-foreground">Lead annotator</span>
            </div>
          </div>
          <p>Reviews pedestrian and cyclist labels for the warehouse cameras.</p>
          <dl className="flex gap-6 border-t pt-2.5 tabular-nums">
            <div>
              <dt className="text-xs text-muted-foreground">Annotations</dt>
              <dd className="font-medium">12,480</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Reviews</dt>
              <dd className="font-medium">342</dd>
            </div>
          </dl>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
