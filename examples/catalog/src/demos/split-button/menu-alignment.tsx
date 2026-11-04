import { DropdownMenuGroup, DropdownMenuItem, SplitButton } from "@robomous/ui-core";

const formats = ["Export as COCO JSON", "Export as YOLO TXT", "Export as Pascal VOC"];

/** `menuAlign="end"` when the button sits at the right edge, so the menu opens inward. */
export default function MenuAlignment() {
  return (
    <div className="flex w-full max-w-md flex-col rounded-lg border">
      <div className="flex items-center justify-between gap-4 p-3">
        <SplitButton variant="outline" label="Export" menuLabel="More export formats">
          <DropdownMenuGroup>
            {formats.map((name) => (
              <DropdownMenuItem key={name}>{name}</DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </SplitButton>
        <span className="text-muted-foreground">start (default): opens rightward</span>
      </div>
      <div className="flex items-center justify-between gap-4 border-t p-3">
        <span className="text-muted-foreground">end: opens leftward</span>
        <SplitButton
          variant="outline"
          label="Export"
          menuLabel="More export formats"
          menuAlign="end"
        >
          <DropdownMenuGroup>
            {formats.map((name) => (
              <DropdownMenuItem key={name}>{name}</DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </SplitButton>
      </div>
    </div>
  );
}
