import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
} from "@robomous/ui-core";

const team = [
  { name: "Mei Tanaka", initials: "MT", slug: "mei-tanaka" },
  { name: "Daniel Okafor", initials: "DO", slug: "daniel-okafor" },
  { name: "Sofia Brennan", initials: "SB", slug: "sofia-brennan" },
];

/** An invite form where every control is named: a required field, an optional one with its hint, and a checkbox the label wraps. */
export default function Overview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Invite a teammate</CardTitle>
        <CardDescription>They join Monterrey DC-2 as soon as they accept.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <AvatarGroup>
            {team.map((person) => (
              <Avatar key={person.name} size="sm">
                <AvatarImage src={`/assets/people/${person.slug}.svg`} alt={person.name} />
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
            ))}
            <AvatarGroupCount>+9</AvatarGroupCount>
          </AvatarGroup>
          <span className="text-muted-foreground">12 people already on this site</span>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lb-ov-email">
            Work email
            <span aria-hidden className="text-destructive">
              *
            </span>
          </Label>
          <Input id="lb-ov-email" type="email" placeholder="lucas.moreau@robomous.ai" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lb-ov-title">
            Job title
            <span className="font-normal text-muted-foreground">Optional</span>
          </Label>
          <Input id="lb-ov-title" placeholder="Robotics engineer" />
        </div>
        <Label>
          <Checkbox defaultChecked />
          Give access to pallet-detection
        </Label>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Send invite</Button>
      </CardFooter>
    </Card>
  );
}
