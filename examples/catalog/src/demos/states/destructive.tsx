import { Alert, AlertDescription, AlertTitle, Button } from "@robomous/ui-core";
import { CircleAlertIcon } from "@robomous/ui-core/icons";

const actions = [
  {
    title: "Archive forklift-night",
    description: "Hide it from lists. You can restore it any time.",
    button: <Button variant="outline">Archive</Button>,
  },
  {
    title: "Delete forklift-night",
    description: "Removes 8,730 frames and their annotations. This can't be undone.",
    button: <Button variant="destructive">Delete</Button>,
  },
];

/** Reversible stays outline; only the action that ends something wears destructive. A failure is reported by an Alert whose icon carries the role. */
export default function Destructive() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col divide-y rounded-xl border">
        {actions.map(({ title, description, button }) => (
          <div key={title} className="flex items-center justify-between gap-6 px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{title}</span>
              <span className="text-pretty text-muted-foreground">{description}</span>
            </div>
            {button}
          </div>
        ))}
      </div>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>Couldn't delete forklift-night</AlertTitle>
        <AlertDescription>
          Batch 7 is still being exported as COCO JSON. Try again when it finishes.
        </AlertDescription>
      </Alert>
    </div>
  );
}
