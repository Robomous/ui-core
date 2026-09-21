import { Toggle } from "@robomous/ui-core";
import { StarIcon } from "lucide-react";

/** `data-icon="inline-start"` pads the icon the same way it does on a Button. */
export default function WithALabel() {
  return (
    <Toggle variant="outline">
      <StarIcon data-icon="inline-start" />
      Starred
    </Toggle>
  );
}
