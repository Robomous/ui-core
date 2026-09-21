import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@robomous/ui-core";

/** `block-start` and `block-end` addons sit above and below an InputGroupTextarea, which grows the group instead of the group growing around a fixed input height. */
export default function WithTextarea() {
  return (
    <InputGroup className="w-72">
      <InputGroupAddon align="block-start">
        <InputGroupText>Review note</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea placeholder="Why was this batch rejected?" aria-label="Review note" />
      <InputGroupAddon align="block-end">
        <InputGroupText>Visible to the annotation team</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
