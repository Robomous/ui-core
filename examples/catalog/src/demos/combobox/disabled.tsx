import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@robomous/ui-core";

const CAMERAS = ["front-left", "front-right"];

/** Locked while an ingest job holds the batch. */
export default function Disabled() {
  return (
    <Combobox items={CAMERAS} defaultValue="front-left" disabled>
      <ComboboxInput disabled placeholder="Pick a camera" aria-label="Camera" className="w-56" />
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
