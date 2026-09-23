import { Alert, AlertDescription, Button } from "@robomous/ui-core";

/** The one Button variant wearing a status colour, because it ends something; the Alert recolours its ink, not a border. */
export default function Destructive() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Button variant="destructive">Delete dataset</Button>
      <Alert variant="destructive" className="max-w-md">
        <AlertDescription>Deleting removes every batch and annotation under it.</AlertDescription>
      </Alert>
    </div>
  );
}
