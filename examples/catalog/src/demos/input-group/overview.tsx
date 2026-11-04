import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@robomous/ui-core";
import { ArrowUpIcon, DatabaseIcon, PlusIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** A prompt box: the textarea fills the group, a `block-start` addon names the context, and the actions sit in a `block-end` addon underneath. */
export default function Overview() {
  const [question, setQuestion] = useState("");

  return (
    <InputGroup className="w-full max-w-lg">
      <InputGroupAddon align="block-start">
        <InputGroupText>
          <DatabaseIcon />
          pallet-detection
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Which frames have a forklift near a person?"
        aria-label="Ask about this dataset"
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          variant="outline"
          size="icon-xs"
          className="rounded-full"
          aria-label="Attach a file"
        >
          <PlusIcon />
        </InputGroupButton>
        <InputGroupText className="ml-auto">detector-v3.2</InputGroupText>
        <InputGroupButton
          variant="default"
          size="icon-xs"
          className="rounded-full"
          aria-label="Send question"
          disabled={question.trim() === ""}
        >
          <ArrowUpIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
