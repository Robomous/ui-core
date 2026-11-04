import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@robomous/ui-core";

const LIMIT = 200;

/** `block-start` and `block-end` addons frame an `InputGroupTextarea`; the group grows with the text instead of around a fixed height. */
export default function WithTextarea() {
  const [reason, setReason] = useState("");

  return (
    <InputGroup className="w-full max-w-md">
      <InputGroupAddon align="block-start">
        <InputGroupText>Rejection reason</InputGroupText>
        <InputGroupText className="ml-auto">
          <Avatar size="sm">
            <AvatarImage src="/assets/people/mei-tanaka.svg" alt="" />
            <AvatarFallback>MT</AvatarFallback>
          </Avatar>
          Mei Tanaka
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        value={reason}
        maxLength={LIMIT}
        onChange={(event) => setReason(event.target.value)}
        placeholder="What should the annotator fix? Mention the box or class."
        aria-label="Rejection reason"
      />
      <InputGroupAddon align="block-end">
        <InputGroupText className="tabular-nums">
          {reason.length}/{LIMIT}
        </InputGroupText>
        <InputGroupButton
          variant="default"
          size="sm"
          className="ml-auto"
          disabled={reason.trim() === ""}
        >
          Reject frame
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
