import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@robomous/ui-core";

const AUGMENTATIONS = [
  {
    id: "flip",
    title: "Horizontal flip",
    hint: "Mirrors frames. Skip it if left and right matter.",
  },
  {
    id: "mosaic",
    title: "Mosaic",
    hint: "Stitches four frames into one. Helps with small objects.",
  },
  {
    id: "glare",
    title: "Glare and exposure",
    hint: "Simulates night shifts and bright dock doors.",
  },
];

/** A `Field` inside a `FieldLabel` makes the whole card the hit area; the checked card tints. */
export default function CardOptions() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium">Augmentations for run-0419</h3>
        <span className="text-muted-foreground">Applied at train time</span>
      </div>
      <FieldGroup>
        {AUGMENTATIONS.map((item) => (
          <FieldLabel key={item.id} htmlFor={`aug-${item.id}`}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{item.title}</FieldTitle>
                <FieldDescription>{item.hint}</FieldDescription>
              </FieldContent>
              <Checkbox id={`aug-${item.id}`} defaultChecked={item.id !== "flip"} />
            </Field>
          </FieldLabel>
        ))}
      </FieldGroup>
    </div>
  );
}
