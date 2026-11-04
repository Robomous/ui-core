import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
} from "@robomous/ui-core";

/** A card around a form: the header says what it does, the footer's top rule sets the submit apart from the fields. */
export default function Form() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create API key</CardTitle>
        <CardDescription>Keys can read datasets and call deployed models.</CardDescription>
      </CardHeader>
      <form className="flex flex-col gap-(--card-spacing)">
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="card-key-name">Name</FieldLabel>
              <Input id="card-key-name" placeholder="ci-pipeline" />
            </Field>
            <Field>
              <FieldLabel htmlFor="card-key-expiry">Expires in</FieldLabel>
              <Input
                id="card-key-expiry"
                defaultValue="90 days"
                aria-describedby="card-key-expiry-hint"
              />
              <FieldDescription id="card-key-expiry-hint">
                You will be emailed a week before it stops working.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end gap-2 border-t">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Create key</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
