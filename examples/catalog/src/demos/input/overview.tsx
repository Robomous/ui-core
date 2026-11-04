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

/** A short create form: each input has a visible label, the one with a format rule says so underneath, and IDs and paths are monospace. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex items-center gap-3">
        <img
          src="/assets/frames/aisle-3.svg"
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col gap-0.5">
          <CardTitle>Create dataset</CardTitle>
          <CardDescription>Frames are imported once the dataset exists.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="in-ov-name">Dataset name</FieldLabel>
            <Input
              id="in-ov-name"
              placeholder="shelf-inspection-2026"
              autoComplete="off"
              aria-describedby="in-ov-name-hint"
            />
            <FieldDescription id="in-ov-name-hint">
              Lowercase letters, numbers and hyphens.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="in-ov-source">Source bucket</FieldLabel>
            <Input
              id="in-ov-source"
              placeholder="s3://robomous-mty/raw/cam-b07"
              autoComplete="off"
              className="font-mono"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="in-ov-owner">Owner email</FieldLabel>
            <Input
              id="in-ov-owner"
              type="email"
              autoComplete="email"
              placeholder="hannah.kim@robomous.ai"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Create dataset</Button>
      </CardFooter>
    </Card>
  );
}
