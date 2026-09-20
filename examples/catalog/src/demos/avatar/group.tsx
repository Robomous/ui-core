import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@robomous/ui-core";

/** AvatarGroupCount sizes its overflow count off the same data-size as the avatars it follows. */
export default function Group() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>YA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  );
}
