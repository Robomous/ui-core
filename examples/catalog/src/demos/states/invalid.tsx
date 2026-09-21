import { Input, Textarea } from "@robomous/ui-core";

/** Invalid reads through `aria-invalid`, never through a class: the component styles the attribute. */
export default function Invalid() {
  return (
    <div className="flex flex-wrap gap-4">
      <Input
        className="w-48"
        defaultValue="Warehouse Cameras"
        aria-label="Dataset slug"
        aria-invalid
      />
      <Textarea
        className="w-64"
        defaultValue="Batch 12"
        aria-label="Annotation note"
        aria-invalid
      />
    </div>
  );
}
