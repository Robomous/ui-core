import { Separator } from "@robomous/ui-core";

/** A vertical separator dividing inline items, such as a toolbar. */
export default function Vertical() {
  return (
    <div className="flex h-8 items-center gap-3 text-sm">
      <span>Datasets</span>
      <Separator orientation="vertical" />
      <span>Batches</span>
      <Separator orientation="vertical" />
      <span>Exports</span>
    </div>
  );
}
