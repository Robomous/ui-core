import { Avatar, AvatarBadge, AvatarFallback } from "@robomous/ui-core";

/** AvatarBadge sits over the corner and scales down with the avatar's own data-size. */
export default function Badge() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>MR</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>MR</AvatarFallback>
        <AvatarBadge />
      </Avatar>
    </div>
  );
}
