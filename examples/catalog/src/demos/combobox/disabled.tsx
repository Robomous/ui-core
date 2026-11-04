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

const NODES = ["gpu-a100-01", "gpu-a100-02"];

/** Locked while a training run holds the node. */
export default function Disabled() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>run-0419 in progress</CardTitle>
        <CardDescription>gpu-a100-01 is held until epoch 60 finishes.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field data-disabled>
          <FieldLabel htmlFor="gpu-node">GPU node</FieldLabel>
          <Combobox items={NODES} defaultValue="gpu-a100-01" disabled>
            <ComboboxInput id="gpu-node" disabled placeholder="Pick a node" />
            <ComboboxContent>
              <ComboboxEmpty>No matching nodes</ComboboxEmpty>
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
