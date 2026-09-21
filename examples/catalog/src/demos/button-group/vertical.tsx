import { Button, ButtonGroup } from "@robomous/ui-core";

/** orientation="vertical" stacks the segments and rounds the top and bottom instead of the ends. */
export default function Vertical() {
  return (
    <ButtonGroup orientation="vertical" className="w-32">
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Move</Button>
      <Button variant="outline">Archive</Button>
    </ButtonGroup>
  );
}
