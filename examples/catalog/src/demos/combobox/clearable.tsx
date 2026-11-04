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

const ROBOTS = ["rb-07 Atlas", "rb-12 Kestrel", "rb-19 Orca"];

/** `showClear` swaps the trigger chevron for a clear button once a value is picked. */
export default function Clearable() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Assign inspection</CardTitle>
        <CardDescription>
          Aisle 14 sweep, Monterrey DC-2. Leave it empty to let the fleet pick.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="assign-robot">Assign to robot</FieldLabel>
          <Combobox items={ROBOTS} defaultValue="rb-07 Atlas">
            <ComboboxInput id="assign-robot" showClear placeholder="Pick a robot" />
            <ComboboxContent>
              <ComboboxEmpty>No matching robots</ComboboxEmpty>
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
