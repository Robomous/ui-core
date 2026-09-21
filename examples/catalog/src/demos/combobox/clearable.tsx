import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@robomous/ui-core";

const CAMERAS = ["front-left", "front-right", "front-center", "rear-left", "rear-right"];

/** `showClear` swaps the trigger chevron for a clear button once a value is picked. */
export default function Clearable() {
  return (
    <Combobox items={CAMERAS} defaultValue="front-center">
      <ComboboxInput showClear placeholder="Pick a camera" aria-label="Camera" className="w-56" />
      <ComboboxContent>
        <ComboboxEmpty>No matching cameras</ComboboxEmpty>
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
