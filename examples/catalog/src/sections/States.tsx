import { Alert, AlertDescription, Badge, Button, Input, Textarea } from "@robomous/ui-core";

import { Section, Specimen } from "../App";

export function States() {
  return (
    <Section
      id="states"
      title="States"
      lede="Hover and focus are live: move the pointer over a row, then tab through it. Disabled controls keep the arrow cursor because nothing will respond. Invalid reads through aria-invalid, never through a class."
    >
      <Specimen title="Default, hover, focus, disabled">
        <div className="grid w-full grid-cols-[8rem_1fr] items-center gap-x-6 gap-y-4 text-sm">
          <span className="text-muted-foreground">default</span>
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Input className="w-48" placeholder="Text" aria-label="Default input" />
          </div>
          <span className="text-muted-foreground">disabled</span>
          <div className="flex flex-wrap gap-2">
            <Button disabled>Primary</Button>
            <Button variant="outline" disabled>
              Outline
            </Button>
            <Input className="w-48" placeholder="Text" aria-label="Disabled input" disabled />
          </div>
          <span className="text-muted-foreground">invalid</span>
          <div className="flex flex-wrap gap-2">
            <Input
              className="w-48"
              defaultValue="not-an-email"
              aria-label="Invalid input"
              aria-invalid
            />
            <Textarea
              className="w-64"
              defaultValue="Too long"
              aria-label="Invalid textarea"
              aria-invalid
            />
          </div>
        </div>
      </Specimen>

      <Specimen title="Status" note="The same four roles on a chip, a mark and inline ink.">
        <div className="grid w-full grid-cols-[8rem_1fr] items-center gap-x-6 gap-y-4 text-sm">
          {(
            [
              ["success", "bg-success", "text-success"],
              ["warning", "bg-warning", "text-warning"],
              ["info", "bg-info", "text-info"],
              ["destructive", "bg-destructive", "text-destructive"],
            ] as const
          ).map(([role, dot, ink]) => (
            <StatusRow key={role} role={role} dot={dot} ink={ink} />
          ))}
        </div>
      </Specimen>

      <Specimen
        title="Destructive action"
        note="The one Button variant with a status colour, because it ends something."
      >
        <Button variant="destructive">Delete dataset</Button>
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>Deleting removes every batch and annotation under it.</AlertDescription>
        </Alert>
      </Specimen>
    </Section>
  );
}

function StatusRow({
  role,
  dot,
  ink,
}: {
  role: "success" | "warning" | "info" | "destructive";
  dot: string;
  ink: string;
}) {
  return (
    <>
      <span className="text-muted-foreground">{role}</span>
      <div className="flex flex-wrap items-center gap-4">
        <Badge variant={role}>{role}</Badge>
        <span className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${dot}`} aria-hidden="true" />
          status dot
        </span>
        <span className={`text-sm ${ink}`}>inline {role} text</span>
      </div>
    </>
  );
}
