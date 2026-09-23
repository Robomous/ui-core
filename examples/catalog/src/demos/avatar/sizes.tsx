import { Avatar, AvatarFallback } from "@robomous/ui-core";

/** Three sizes, carried as data-size so anything nested reads the same scale. */
export default function Sizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarFallback>YA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>YA</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>YA</AvatarFallback>
      </Avatar>
    </div>
  );
}
