import { ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";

/** Set `size` once on the group; every item inherits it, so the segments always match. */
export default function Sizes() {
  return (
    <div className="grid w-fit grid-cols-[4rem_auto] items-center gap-x-8 gap-y-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <div key={size} className="contents">
          <span className="text-muted-foreground">{size}</span>
          <ToggleGroup
            type="single"
            variant="outline"
            size={size}
            defaultValue="fp16"
            aria-label={`Precision, ${size}`}
          >
            <ToggleGroupItem value="fp32">FP32</ToggleGroupItem>
            <ToggleGroupItem value="fp16">FP16</ToggleGroupItem>
            <ToggleGroupItem value="int8">INT8</ToggleGroupItem>
          </ToggleGroup>
        </div>
      ))}
    </div>
  );
}
