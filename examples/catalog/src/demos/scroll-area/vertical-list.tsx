import { ScrollArea } from "@robomous/ui-core";

/** The viewport, not the ScrollArea root, is the scroll container: sizing goes on the root, content grows freely inside it. */
export default function VerticalList() {
  return (
    <ScrollArea className="h-40 w-64 rounded-lg border">
      <div className="flex flex-col gap-1 p-2">
        {Array.from({ length: 24 }, (_, index) => (
          <div
            key={index}
            className="rounded-md px-2 py-1.5 font-mono text-xs text-muted-foreground"
          >
            frame_{String(index).padStart(4, "0")}.png
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
