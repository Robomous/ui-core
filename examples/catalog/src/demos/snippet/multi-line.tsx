import { Snippet } from "@robomous/ui-core";

/** An array is a short block of commands that belong together: one prompt per line, copied joined by newlines. */
export default function MultiLine() {
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      <span className="text-muted-foreground">Flash firmware 4.2.1 to rb-07</span>
      <Snippet
        text={[
          "robomous fleet use monterrey-dc-2",
          "robomous fleet flash --firmware 4.2.1 --robot rb-07",
        ]}
        className="w-full"
      />
    </div>
  );
}
