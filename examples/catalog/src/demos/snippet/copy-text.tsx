import { Snippet } from "@robomous/ui-core";

/** `copyText` puts something other than the visible text on the clipboard, so a long command can read short and still run complete. */
export default function CopyText() {
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <span className="text-muted-foreground">Start the edge agent</span>
      <Snippet
        className="w-full"
        text="docker run robomous/edge-agent"
        copyText="docker run --rm -e ROBOMOUS_TOKEN -p 8080:8080 robomous/edge-agent:4.2.1"
      />
      <span className="text-xs text-muted-foreground">
        Copying adds the cleanup, token and port flags.
      </span>
    </div>
  );
}
