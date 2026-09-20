import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@robomous/ui-core";
import { CameraIcon } from "lucide-react";

/** InputGroupText renders plain, non-interactive copy inside an addon, such as a units suffix. */
export default function UnitsText() {
  return (
    <InputGroup className="w-48">
      <InputGroupAddon>
        <CameraIcon />
      </InputGroupAddon>
      <InputGroupInput defaultValue="30" aria-label="Frame rate" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>fps</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
