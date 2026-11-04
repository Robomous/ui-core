import {
  Button,
  ButtonGroup,
  ButtonGroupText,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
} from "@robomous/ui-core";

/** Text and a button flank an input; the group rounds only the first and the last segment. */
export default function TextInput() {
  return (
    <FieldGroup className="w-full max-w-md rounded-lg border p-4">
      <Field>
        <FieldLabel htmlFor="stream-address">Stream address</FieldLabel>
        <ButtonGroup className="w-full">
          <ButtonGroupText asChild className="font-mono">
            <label htmlFor="stream-address">rtsp://</label>
          </ButtonGroupText>
          <Input id="stream-address" defaultValue="10.4.2.31:554/dock-a" className="font-mono" />
          <Button variant="outline">Test stream</Button>
        </ButtonGroup>
        <FieldDescription>The camera must be reachable from the edge gateway.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="site-slug">Site address</FieldLabel>
        <ButtonGroup className="w-full">
          <ButtonGroupText className="font-mono">https://</ButtonGroupText>
          <Input id="site-slug" defaultValue="monterrey-dc2" className="font-mono" />
          <ButtonGroupText className="font-mono">.robomous.ai</ButtonGroupText>
        </ButtonGroup>
      </Field>
    </FieldGroup>
  );
}
