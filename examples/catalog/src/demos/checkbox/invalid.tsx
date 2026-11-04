import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@robomous/ui-core";
import { useState } from "react";

/** `aria-invalid` paints the destructive ring; the message is the call site's, as in any Field. */
export default function Invalid() {
  const [consent, setConsent] = useState(false);
  const [attempted, setAttempted] = useState(true);
  const invalid = attempted && !consent;

  return (
    <Card className="w-full max-w-sm">
      <form
        className="contents"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          setAttempted(true);
        }}
      >
        <CardHeader>
          <CardTitle>Upload 248 images</CardTitle>
          <CardDescription>They will join pallet-detection, batch 42.</CardDescription>
        </CardHeader>
        <CardContent>
          <Field orientation="horizontal" data-invalid={invalid || undefined}>
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked === true)}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? "consent-error" : undefined}
            />
            <FieldContent>
              <FieldLabel htmlFor="consent">I have the rights to upload these images</FieldLabel>
              {invalid && (
                <FieldError id="consent-error">Confirm this before uploading.</FieldError>
              )}
            </FieldContent>
          </Field>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit">Upload</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
