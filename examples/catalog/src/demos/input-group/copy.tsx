import {
  Field,
  FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@robomous/ui-core";
import { CheckIcon, CopyIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const endpoint = "https://api.robomous.ai/v1/detector-prod";

/** A read-only value with its action attached: the button flips to a check for a moment once the text is on the clipboard. */
export default function Copy() {
  const [copied, setCopied] = useState(false);

  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="ig-endpoint">Inference endpoint</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="ig-endpoint"
          readOnly
          value={endpoint}
          aria-describedby="ig-endpoint-hint"
          className="font-mono"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={copied ? "Copied" : "Copy endpoint"}
            onClick={async () => {
              await navigator.clipboard.writeText(endpoint);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription id="ig-endpoint-hint">
        Send a POST request with an image to get detections from detector-v3.2.
      </FieldDescription>
    </Field>
  );
}
