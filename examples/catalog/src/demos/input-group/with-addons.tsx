import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@robomous/ui-core";
import { SearchIcon } from "lucide-react";

/** An icon addon at `inline-start`, the control, and a button addon at `inline-end`; clicking anywhere in an addon that isn't a button refocuses the input. */
export default function WithAddons() {
  return (
    <InputGroup className="w-64">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search frames" aria-label="Search frames" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>Go</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
