import { Alert, AlertDescription, AlertTitle } from "@robomous/ui-core";
import { CircleCheckIcon } from "@robomous/ui-core/icons";

/** Not every part is required: a title alone for a one-line fact, a description alone for plain prose, no icon needed. */
export default function TitleOnly() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>Calibration saved for cam-02 (Aisle 14)</AlertTitle>
      </Alert>
      <Alert>
        <AlertDescription>
          Annotations are locked while a batch is being exported. Editing resumes when it finishes.
        </AlertDescription>
      </Alert>
    </div>
  );
}
