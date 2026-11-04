import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  Field,
  FieldLabel,
} from "@robomous/ui-core";

const CLASSES = [
  { value: "Equipment", items: ["forklift", "pallet-jack", "amr"] },
  { value: "People", items: ["person", "hard-hat"] },
  { value: "Cargo", items: ["pallet", "box", "damaged-box"] },
];

/** Groups are objects with an `items` array; filtering hides a group once none of its items match. */
export default function Grouped() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add a label class</CardTitle>
        <CardDescription>Classes are grouped by what they represent.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="grouped-class">Label class</FieldLabel>
          <Combobox items={CLASSES}>
            <ComboboxInput id="grouped-class" placeholder="Search classes" />
            <ComboboxContent>
              <ComboboxEmpty>No matching classes</ComboboxEmpty>
              <ComboboxList>
                {(group: (typeof CLASSES)[number]) => (
                  <ComboboxGroup key={group.value} items={group.items}>
                    <ComboboxLabel>{group.value}</ComboboxLabel>
                    <ComboboxCollection>
                      {(item: string) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxCollection>
                  </ComboboxGroup>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
      </CardContent>
    </Card>
  );
}
