import { Checkbox, Label } from "@robomous/ui-core";
import { useState } from "react";

const assets = ["frame_0001.jpg", "frame_0002.jpg", "frame_0003.jpg"];

/** A select-all reads `aria-checked="mixed"` while only some of its rows are chosen. */
export default function Indeterminate() {
  const [chosen, setChosen] = useState<string[]>([assets[0] ?? ""]);
  const all = chosen.length === assets.length ? true : chosen.length > 0 ? "indeterminate" : false;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox
          id="select-all"
          checked={all}
          onCheckedChange={(checked) => setChosen(checked === true ? assets : [])}
        />
        <Label htmlFor="select-all">Select all</Label>
      </div>
      {assets.map((asset) => (
        <div key={asset} className="flex items-center gap-2 pl-6">
          <Checkbox
            id={asset}
            checked={chosen.includes(asset)}
            onCheckedChange={(checked) =>
              setChosen((current) =>
                checked === true ? [...current, asset] : current.filter((a) => a !== asset),
              )
            }
          />
          <Label htmlFor={asset} className="font-mono">
            {asset}
          </Label>
        </div>
      ))}
    </div>
  );
}
