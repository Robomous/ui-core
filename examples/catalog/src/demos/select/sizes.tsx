import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@robomous/ui-core";

/** Two trigger heights: `default` for a form, `sm` for a dense toolbar. */
export default function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select defaultValue="base">
        <SelectTrigger className="w-56" aria-label="Model">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tiny">org/detector-tiny</SelectItem>
          <SelectItem value="base">org/detector-base</SelectItem>
          <SelectItem value="large">org/detector-large</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="coco">
        <SelectTrigger size="sm" className="w-40" aria-label="Export format">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="coco">COCO</SelectItem>
          <SelectItem value="yolo">YOLO</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
