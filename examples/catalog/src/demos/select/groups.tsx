import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@robomous/ui-core";

/** `SelectGroup` and `SelectLabel` split a long list of sites into named sections. */
export default function Groups() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Deploy detector-v3.2</CardTitle>
        <CardDescription>Roll the model out to every robot at one site.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="site">Site</FieldLabel>
          <Select defaultValue="mty-2">
            <SelectTrigger id="site" className="w-full" aria-describedby="site-hint">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Mexico</SelectLabel>
                <SelectItem value="mty-2">Monterrey DC-2</SelectItem>
                <SelectItem value="gdl-1">Guadalajara DC-1</SelectItem>
                <SelectItem value="qro">Querétaro Hub</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>United States</SelectLabel>
                <SelectItem value="ldo">Laredo Cross-dock</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription id="site-hint">Sites are grouped by country.</FieldDescription>
        </Field>
      </CardContent>
    </Card>
  );
}
