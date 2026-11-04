import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldGroup,
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@robomous/ui-core";

/** A form where each field is one choice from a known list: the trigger shows the pick, or a placeholder. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>New training run</CardTitle>
        <CardDescription>Fine-tune a detector on a dataset version.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="run-base">Base model</FieldLabel>
            <Select defaultValue="v3.2">
              <SelectTrigger id="run-base" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v3.2">detector-v3.2 (production, mAP 0.71)</SelectItem>
                <SelectItem value="v3.1">detector-v3.1 (previous, mAP 0.66)</SelectItem>
                <SelectItem value="seg-1.4">segmenter-v1.4</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="run-dataset">Dataset</FieldLabel>
            <Select>
              <SelectTrigger id="run-dataset" className="w-full">
                <SelectValue placeholder="Choose a dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pallets">pallet-detection (18,204 frames)</SelectItem>
                <SelectItem value="forklift">forklift-night (8,730 frames)</SelectItem>
                <SelectItem value="shelves">shelf-inspection-2026</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="run-gpu">GPU</FieldLabel>
            <Select defaultValue="a10g">
              <SelectTrigger id="run-gpu" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a10g">A10G, 24 GB</SelectItem>
                <SelectItem value="a100">A100, 80 GB</SelectItem>
                <SelectItem value="h100">H100, 80 GB</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Start run</Button>
      </CardFooter>
    </Card>
  );
}
