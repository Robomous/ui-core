import {
  Button,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Switch,
} from "@robomous/ui-core";
import { useId } from "react";

/** Each disabled control keeps its label and says why it is unavailable; the enabled action beside them is the way forward. */
export default function Disabled() {
  const id = useId();
  return (
    <div className="flex w-full max-w-sm flex-col gap-5 rounded-xl border p-5">
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">Ingest from cam-02</span>
        <span className="text-muted-foreground">Running · 1,204 of 3,000 frames · Aisle 14</span>
      </div>
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor={`${id}-camera`}>Camera</FieldLabel>
          <Input
            id={`${id}-camera`}
            defaultValue="cam-02 · Aisle 14"
            disabled
            aria-describedby={`${id}-camera-hint`}
          />
          <FieldDescription id={`${id}-camera-hint`}>
            Locked while the ingest is running.
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor={`${id}-retry`}>Auto-retry dropped frames</FieldLabel>
            <FieldDescription id={`${id}-retry-hint`}>
              Set by your workspace policy.
            </FieldDescription>
          </FieldContent>
          <Switch
            id={`${id}-retry`}
            defaultChecked
            disabled
            aria-describedby={`${id}-retry-hint`}
          />
        </Field>
      </FieldGroup>
      <div className="flex justify-end gap-2 border-t pt-4">
        <Button variant="outline">Stop ingest</Button>
        <Button disabled>Start ingest</Button>
      </div>
    </div>
  );
}
