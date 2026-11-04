import { Avatar, AvatarFallback, Separator } from "@robomous/ui-core";

/** `orientation="vertical"` divides inline items; it stretches to the height of the row it sits in. */
export default function Vertical() {
  return (
    <div className="flex w-fit items-center gap-4 rounded-lg border px-4 py-3 text-xs">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>A7</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">atlas-07</span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-0.5">
        <span className="text-muted-foreground">Site</span>
        <span>Monterrey DC-2</span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-0.5">
        <span className="text-muted-foreground">Battery</span>
        <span className="tabular-nums">82%</span>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-0.5">
        <span className="text-muted-foreground">Firmware</span>
        <span className="tabular-nums">2.8.1</span>
      </div>
    </div>
  );
}
