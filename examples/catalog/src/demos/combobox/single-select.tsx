import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@robomous/ui-core";

const CLASSES = ["vehicle", "pedestrian", "cyclist", "traffic-sign", "traffic-light"];

/** Filters as you type; `ComboboxList` takes a function child, one call per matching item. */
export default function SingleSelect() {
  return (
    <Combobox items={CLASSES}>
      <ComboboxInput placeholder="Filter by class" aria-label="Class" className="w-56" />
      <ComboboxContent>
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
