import { Snippet, toast } from "@robomous/ui-core";

/** `onCopy` runs after the copy, for a confirmation the reader cannot miss. */
export default function Callback() {
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <span className="text-muted-foreground">Pull the reviewed batch</span>
      <Snippet
        className="w-full"
        text="robomous datasets pull pallet-detection --batch 0412"
        onCopy={() => toast.success("Copied pull command")}
      />
    </div>
  );
}
