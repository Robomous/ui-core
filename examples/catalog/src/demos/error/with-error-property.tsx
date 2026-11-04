import { Badge, ErrorMessage } from "@robomous/ui-core";

/** `error` takes a message with a follow-up link: what happened, then the way out. */
export default function WithErrorProperty() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono font-medium">rb-12 “Kestrel”</span>
        <Badge variant="destructive">sync failed</Badge>
      </div>
      <ErrorMessage
        error={{
          message: "Couldn't sync firmware 4.2.1 to rb-12.",
          action: "View rollout log",
          link: "https://status.robomous.ai",
        }}
      />
    </div>
  );
}
