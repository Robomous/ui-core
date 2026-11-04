import {
  Field,
  FieldDescription,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@robomous/ui-core";
import { EyeIcon, EyeOffIcon, KeyRoundIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

/** A secret stays masked until asked: the toggle swaps the input's `type` and says what it will do next. */
export default function Reveal() {
  const [visible, setVisible] = useState(false);

  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="ig-key">API key</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <KeyRoundIcon />
        </InputGroupAddon>
        <InputGroupInput
          id="ig-key"
          type={visible ? "text" : "password"}
          defaultValue="rk_live_9f2c41d7b8a3e605"
          autoComplete="off"
          aria-describedby="ig-key-hint"
          className="font-mono"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={visible ? "Hide API key" : "Show API key"}
            onClick={() => setVisible((v) => !v)}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription id="ig-key-hint">
        Created Oct 28, 14:32. Treat it like a password and rotate it if it leaks.
      </FieldDescription>
    </Field>
  );
}
