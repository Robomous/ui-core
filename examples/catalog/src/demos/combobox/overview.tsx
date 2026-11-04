import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  Field,
  FieldDescription,
  FieldLabel,
} from "@robomous/ui-core";

interface Person {
  value: string;
  label: string;
  role: string;
  initials: string;
  photo: string;
}

const person = (slug: string) => `/assets/people/${slug}.svg`;

const PEOPLE: Person[] = [
  {
    value: "hannah",
    label: "Hannah Kim",
    role: "Ops lead",
    initials: "HK",
    photo: person("hannah-kim"),
  },
  {
    value: "daniel",
    label: "Daniel Okafor",
    role: "ML engineer",
    initials: "DO",
    photo: person("daniel-okafor"),
  },
  {
    value: "sofia",
    label: "Sofia Brennan",
    role: "Annotation lead",
    initials: "SB",
    photo: person("sofia-brennan"),
  },
  {
    value: "lucas",
    label: "Lucas Moreau",
    role: "Robotics engineer",
    initials: "LM",
    photo: person("lucas-moreau"),
  },
  {
    value: "mei",
    label: "Mei Tanaka",
    role: "Data scientist",
    initials: "MT",
    photo: person("mei-tanaka"),
  },
];

/** Type to narrow a list too long to scan. Items are objects, so each row can carry an avatar and a role. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Assign a batch</CardTitle>
        <CardDescription>Batch 42 of pallet-detection, 248 frames to annotate.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="assignee">Assignee</FieldLabel>
          <Combobox items={PEOPLE}>
            <ComboboxInput
              id="assignee"
              placeholder="Search by name"
              aria-describedby="assignee-hint"
            />
            <ComboboxContent>
              <ComboboxEmpty>No teammate matches that search.</ComboboxEmpty>
              <ComboboxList>
                {(item: Person) => (
                  <ComboboxItem key={item.value} value={item}>
                    <Avatar size="sm">
                      <AvatarImage src={item.photo} alt="" />
                      <AvatarFallback>{item.initials}</AvatarFallback>
                    </Avatar>
                    {item.label}
                    <span className="ml-auto pr-5 text-muted-foreground">{item.role}</span>
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription id="assignee-hint">
            They are notified by email and Slack.
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Assign</Button>
      </CardFooter>
    </Card>
  );
}
