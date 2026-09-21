import { Button, ButtonGroup, ButtonGroupText, Input } from "@robomous/ui-core";

/** Every segment carries a data-slot, which is what the group reads to round only the first and the last child. */
export default function TextInput() {
  return (
    <ButtonGroup>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input placeholder="robomous.ai" aria-label="Domain" />
      <Button variant="outline">Check</Button>
    </ButtonGroup>
  );
}
