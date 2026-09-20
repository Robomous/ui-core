import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  useComboboxAnchor,
} from "@robomous/ui-core";
import { useState } from "react";

const CLASSES = ["vehicle", "pedestrian", "cyclist", "traffic-sign", "traffic-light"];

/** `multiple` collects values into an array; `ComboboxChips` anchors the popup instead of an input. */
export default function MultiSelect() {
  const anchor = useComboboxAnchor();
  const [value, setValue] = useState<string[]>(["vehicle", "cyclist"]);

  return (
    <Combobox items={CLASSES} multiple value={value} onValueChange={setValue}>
      <ComboboxChips ref={anchor} className="w-72">
        {value.map((item) => (
          <ComboboxChip key={item}>{item}</ComboboxChip>
        ))}
        <ComboboxChipsInput placeholder="Add a class" aria-label="Classes" />
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No matching classes</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
