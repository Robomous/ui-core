import { Avatar, AvatarFallback, AvatarImage } from "@robomous/ui-core";

/** AvatarFallback is not optional: a broken AvatarImage unmounts straight to it, never leaving an empty circle. */
export default function Fallback() {
  return (
    <Avatar>
      <AvatarImage src="/does-not-exist.png" alt="" />
      <AvatarFallback>YA</AvatarFallback>
    </Avatar>
  );
}
