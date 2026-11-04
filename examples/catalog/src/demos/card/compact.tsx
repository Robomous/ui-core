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
} from "@robomous/ui-core";

const team = [
  { initials: "SB", image: "/assets/people/sofia-brennan.svg" },
  { initials: "MT", image: "/assets/people/mei-tanaka.svg" },
  { initials: "JW", image: "/assets/people/jonas-weber.svg" },
];

/** The same card at both sizes: `size="sm"` tightens `--card-spacing` for header, content and footer at once. */
export default function Compact() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
      {(["default", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="font-mono text-xs text-muted-foreground">size="{size}"</span>
          <Card size={size}>
            <CardHeader>
              <CardTitle>Seats</CardTitle>
              <CardDescription>Annotators and reviewers on this team.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-3">
              <AvatarGroup>
                {team.map(({ initials, image }) => (
                  <Avatar key={initials} size="sm">
                    <AvatarImage src={image} alt="" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                ))}
                <AvatarGroupCount>+11</AvatarGroupCount>
              </AvatarGroup>
              <span className="tabular-nums">14 of 20 used</span>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Manage seats
              </Button>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
