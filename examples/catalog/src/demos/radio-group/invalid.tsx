import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  RadioGroup,
  RadioGroupItem,
} from "@robomous/ui-core";

const roles = ["owner", "admin", "annotator", "viewer"];

/** `aria-invalid` on each item rings it in the destructive colour while the checked state still reads through; the `FieldError` below says why. */
export default function Invalid() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="/assets/people/tom-becker.svg" alt="" />
          <AvatarFallback>TB</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">Tom Becker</span>
          <span className="text-muted-foreground">tom.becker@robomous.ai</span>
        </div>
      </div>
      <FieldSet>
        <FieldLegend variant="label">Role at Monterrey DC-2</FieldLegend>
        <RadioGroup defaultValue="owner" aria-describedby="role-error">
          {roles.map((role) => (
            <Field key={role} orientation="horizontal">
              <RadioGroupItem value={role} id={`role-${role}`} aria-invalid />
              <FieldLabel htmlFor={`role-${role}`} className="capitalize">
                {role}
              </FieldLabel>
            </Field>
          ))}
        </RadioGroup>
        <FieldError id="role-error">An organization can have only one Owner.</FieldError>
      </FieldSet>
      <Button disabled className="self-end">
        Save role
      </Button>
    </div>
  );
}
