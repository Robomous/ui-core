import { Avatar, AvatarFallback, AvatarImage } from "@robomous/ui-core";
import { BotIcon } from "@robomous/ui-core/icons";

/** When the image loads, `AvatarFallback` stays out of sight; when it fails, it takes over: initials for a person, an icon for something that has no name to abbreviate. */
export default function Fallback() {
  return (
    <div className="grid w-full max-w-md grid-cols-4 gap-4">
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src="/assets/robots/atlas.svg" alt="" />
          <AvatarFallback>AT</AvatarFallback>
        </Avatar>
        <span className="text-center text-xs text-balance text-muted-foreground">
          The image, once it loads
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src="/avatars/mei-tanaka.png" alt="" />
          <AvatarFallback>MT</AvatarFallback>
        </Avatar>
        <span className="text-center text-xs text-balance text-muted-foreground">
          Initials for a person
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarImage src="/avatars/rb-07.png" alt="" />
          <AvatarFallback>
            <BotIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <span className="text-center text-xs text-balance text-muted-foreground">
          Icon for a robot
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar size="lg">
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
        <span className="text-center text-xs text-balance text-muted-foreground">
          Placeholder for no one yet
        </span>
      </div>
    </div>
  );
}
