import { Avatar, AvatarFallback, AvatarImage, Badge, Button } from "@robomous/ui-core";

/** `AvatarImage` fills the circle and crops to cover it; the fallback stays underneath until the image has loaded. */
export default function ImageAvatar() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border p-3">
      <Avatar size="lg">
        <AvatarImage src="/assets/people/daniel-okafor.svg" alt="" />
        <AvatarFallback>DO</AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="font-medium">Daniel Okafor</span>
          <Badge variant="quiet">ML engineer</Badge>
        </div>
        <span className="truncate text-muted-foreground">Owns detector-v3.2 and run-0419</span>
      </div>
      <Button variant="outline" size="sm">
        View profile
      </Button>
    </div>
  );
}
