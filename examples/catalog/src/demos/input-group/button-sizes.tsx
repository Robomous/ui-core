import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@robomous/ui-core";
import { PlusIcon } from "lucide-react";

/** InputGroupButton comes in four sizes, `xs` by default, so a dense control never overruns the group's own height. */
export default function ButtonSizes() {
  return (
    <div className="flex flex-col gap-3">
      <InputGroup className="w-64">
        <InputGroupInput placeholder="Batch name" aria-label="Batch name" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs">Apply</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="w-64">
        <InputGroupInput placeholder="Batch name" aria-label="Batch name" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm">Apply</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="w-64">
        <InputGroupInput placeholder="Batch name" aria-label="Batch name" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Add">
            <PlusIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="w-64">
        <InputGroupInput placeholder="Batch name" aria-label="Batch name" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-sm" aria-label="Add">
            <PlusIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
