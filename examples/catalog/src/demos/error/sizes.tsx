import { ErrorMessage } from "@robomous/ui-core";

/** Three sizes, to sit beside the text around it: a table cell, a field, a panel. */
export default function Sizes() {
  return (
    <div className="grid w-full max-w-md grid-cols-[4rem_1fr] items-start gap-x-4 gap-y-5">
      <span className="text-muted-foreground">sm</span>
      <ErrorMessage size="sm">Camera offline.</ErrorMessage>
      <span className="text-muted-foreground">default</span>
      <ErrorMessage>Camera cam-02 is offline.</ErrorMessage>
      <span className="text-muted-foreground">lg</span>
      <ErrorMessage size="lg">
        Camera cam-02 (Aisle 14) has been offline for 12 minutes.
      </ErrorMessage>
    </div>
  );
}
