import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Field,
  FieldLabel,
} from "@robomous/ui-core";

const MODELS = [
  "detector-v3.2",
  "detector-v3.1",
  "detector-v2.9",
  "segmenter-v1.4",
  "tracker-v0.8",
];

/** Filters as you type; `ComboboxList` takes a function child, one call per matching item. */
export default function SingleSelect() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Set a base model</CardTitle>
        <CardDescription>run-0419 fine-tunes from these weights.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="base-model">Base model</FieldLabel>
          <Combobox items={MODELS}>
            <ComboboxInput id="base-model" placeholder="Filter by name" />
            <ComboboxContent>
              <ComboboxEmpty>No matching models</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
      </CardContent>
    </Card>
  );
}
