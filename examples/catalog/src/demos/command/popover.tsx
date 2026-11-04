import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Field,
  FieldDescription,
  FieldLabel,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@robomous/ui-core";
import { ChevronsUpDownIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const MODELS = [
  { name: "detector-v3.2", map: "0.71" },
  { name: "detector-v3.1", map: "0.66" },
  { name: "detector-v3.3-rc", map: "0.68" },
  { name: "segmenter-v1.4", map: "0.59" },
  { name: "tracker-v0.9", map: "0.52" },
];

/** A searchable picker: `Command` inside a `Popover`, with `data-checked` drawing the tick on the current choice. */
export default function InPopover() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState("detector-v3.2");

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="base-model-picker">Base model</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="base-model-picker"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {model}
            <ChevronsUpDownIcon data-icon="inline-end" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput placeholder="Search models" aria-label="Search models" />
            <CommandList>
              <CommandEmpty>No model found.</CommandEmpty>
              <CommandGroup>
                {MODELS.map((item) => (
                  <CommandItem
                    key={item.name}
                    value={item.name}
                    data-checked={model === item.name}
                    onSelect={() => {
                      setModel(item.name);
                      setOpen(false);
                    }}
                  >
                    {item.name}
                    <span className="ml-auto text-muted-foreground tabular-nums group-data-[checked=true]/command-item:hidden">
                      mAP {item.map}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FieldDescription>run-0419 fine-tunes from these weights.</FieldDescription>
    </Field>
  );
}
