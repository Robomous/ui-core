import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Checkbox,
  Label,
} from "@robomous/ui-core";

const statuses = [
  ["Unlabeled", "2,310"],
  ["In annotation", "864"],
  ["In review", "412"],
  ["Approved", "14,618"],
];
const assignees = [
  ["Sofia Brennan", "sofia-brennan", "412"],
  ["Jonas Weber", "jonas-weber", "288"],
  ["Mei Tanaka", "mei-tanaka", "164"],
];

/** `type="multiple"`: every region opens independently, and a disabled item stays shut. */
export default function Multiple() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Filter frames · pallet-detection</span>
        <Button variant="ghost" size="xs">
          Reset
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["status", "assignee"]}>
        <AccordionItem value="status">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {statuses.map(([status, count], index) => (
              <div key={status} className="flex items-center gap-2">
                <Checkbox id={`status-${index}`} defaultChecked={index < 2} />
                <Label htmlFor={`status-${index}`} className="flex-1">
                  {status}
                </Label>
                <span className="text-muted-foreground tabular-nums">{count}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="assignee">
          <AccordionTrigger>Assignee</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {assignees.map(([name, slug, count], index) => (
              <div key={name} className="flex items-center gap-2">
                <Checkbox id={`assignee-${index}`} />
                <Avatar size="sm">
                  <AvatarImage src={`/assets/people/${slug}.svg`} alt="" />
                  <AvatarFallback>
                    {name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Label htmlFor={`assignee-${index}`} className="flex-1">
                  {name}
                </Label>
                <span className="text-muted-foreground tabular-nums">{count}</span>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="model" disabled>
          <AccordionTrigger>Model predictions</AccordionTrigger>
          <AccordionContent>Available once a model has been trained.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
