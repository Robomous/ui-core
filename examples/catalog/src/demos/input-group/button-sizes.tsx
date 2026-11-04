import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@robomous/ui-core";
import { UserPlusIcon } from "@robomous/ui-core/icons";

/** Four sizes, `xs` by default: it is the one that fits inside the group's own height without enlarging it. */
export default function ButtonSizes() {
  return (
    <div className="grid w-full max-w-md grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3">
      <span className="font-mono text-muted-foreground">xs</span>
      <InputGroup>
        <InputGroupInput placeholder="hannah.kim@robomous.ai" aria-label="Invite a teammate, xs" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs">Invite</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <span className="font-mono text-muted-foreground">sm</span>
      <InputGroup>
        <InputGroupInput placeholder="hannah.kim@robomous.ai" aria-label="Invite a teammate, sm" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm">Invite</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <span className="font-mono text-muted-foreground">icon-xs</span>
      <InputGroup>
        <InputGroupInput
          placeholder="hannah.kim@robomous.ai"
          aria-label="Invite a teammate, icon-xs"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Send invite">
            <UserPlusIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <span className="font-mono text-muted-foreground">icon-sm</span>
      <InputGroup>
        <InputGroupInput
          placeholder="hannah.kim@robomous.ai"
          aria-label="Invite a teammate, icon-sm"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm" aria-label="Send invite">
            <UserPlusIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
