import { Checkbox, Label, Switch, ToggleGroup, ToggleGroupItem } from "@robomous/ui-core";
import { useId, useState } from "react";

function Head({ name, selector }: { name: string; selector: string }) {
  return (
    <h4 className="flex flex-col gap-0.5">
      <span className="font-medium">{name}</span>
      <code className="font-mono text-[0.625rem] text-muted-foreground">{selector}</code>
    </h4>
  );
}

/** Checked, on and pressed are the primitive's attributes; each control here is live, so the state can be flipped and watched. */
export default function Selection() {
  const id = useId();
  const [view, setView] = useState("camera");
  return (
    <div className="grid w-full max-w-xl gap-8 sm:grid-cols-3">
      <section className="flex flex-col gap-3">
        <Head name="Checkbox" selector="data-checked" />
        {(
          [
            ["Unchecked", false],
            ["Checked", true],
            ["Indeterminate", "indeterminate"],
          ] as const
        ).map(([label, checked]) => (
          <div key={label} className="flex items-center gap-2">
            <Checkbox id={`${id}-${label}`} defaultChecked={checked} />
            <Label htmlFor={`${id}-${label}`}>{label}</Label>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-3">
        <Head name="Switch" selector="data-checked" />
        {(
          [
            ["Headlights", false],
            ["Obstacle stop", true],
          ] as const
        ).map(([label, checked]) => (
          <div key={label} className="flex items-center gap-2">
            <Switch id={`${id}-${label}`} defaultChecked={checked} />
            <Label htmlFor={`${id}-${label}`}>{label}</Label>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-3">
        <Head name="Toggle group" selector="data-[state=on]" />
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={view}
          onValueChange={(next) => next && setView(next)}
          aria-label="Feed"
          className="w-fit"
        >
          <ToggleGroupItem value="camera">Camera</ToggleGroupItem>
          <ToggleGroupItem value="lidar">Lidar</ToggleGroupItem>
          <ToggleGroupItem value="map">Map</ToggleGroupItem>
        </ToggleGroup>
        <span className="text-muted-foreground">
          Showing the <span className="text-foreground">{view}</span> feed.
        </span>
      </section>
    </div>
  );
}
