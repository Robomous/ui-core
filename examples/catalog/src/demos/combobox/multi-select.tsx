import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  Field,
  FieldLabel,
  useComboboxAnchor,
} from "@robomous/ui-core";
import { useState } from "react";

interface Person {
  value: string;
  label: string;
  initials: string;
  photo: string;
}

const portrait = (slug: string) => `/assets/people/${slug}.svg`;

const REVIEWERS: Person[] = [
  {
    value: "hannah",
    label: "Hannah Kim",
    initials: "HK",
    photo: portrait("hannah-kim"),
  },
  {
    value: "sofia",
    label: "Sofia Brennan",
    initials: "SB",
    photo: portrait("sofia-brennan"),
  },
  {
    value: "jonas",
    label: "Jonas Weber",
    initials: "JW",
    photo: portrait("jonas-weber"),
  },
  {
    value: "mei",
    label: "Mei Tanaka",
    initials: "MT",
    photo: portrait("mei-tanaka"),
  },
  {
    value: "mateo",
    label: "Mateo Ruiz",
    initials: "MR",
    photo: portrait("mateo-ruiz"),
  },
];

function PersonAvatar({ person }: { person: Person }) {
  return (
    <Avatar size="sm" className="size-4">
      <AvatarImage src={person.photo} alt="" />
      <AvatarFallback className="text-[0.5rem]">{person.initials}</AvatarFallback>
    </Avatar>
  );
}

/** `multiple` collects values into an array; `ComboboxChips` anchors the popup instead of an input. */
export default function MultiSelect() {
  const anchor = useComboboxAnchor();
  const [value, setValue] = useState<Person[]>([REVIEWERS[0], REVIEWERS[2]]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Review request</CardTitle>
        <CardDescription>Reviewers get an email with the first batch of frames.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="reviewers">Reviewers</FieldLabel>
          <Combobox items={REVIEWERS} multiple value={value} onValueChange={setValue}>
            <ComboboxChips ref={anchor}>
              {value.map((person) => (
                <ComboboxChip key={person.value}>
                  <PersonAvatar person={person} />
                  {person.label}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput id="reviewers" placeholder="Add a reviewer" />
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No matching members</ComboboxEmpty>
              <ComboboxList>
                {(person: Person) => (
                  <ComboboxItem key={person.value} value={person}>
                    <PersonAvatar person={person} />
                    {person.label}
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
