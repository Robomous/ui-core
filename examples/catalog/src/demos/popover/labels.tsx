import {
  Button,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@robomous/ui-core";
import { TagsIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

// Position and size are percentages of the frame.
const classes = [
  {
    name: "pallet",
    boxes: [
      { left: 12.9, top: 42.6, width: 15.1, height: 29 },
      { left: 79, top: 46.6, width: 21, height: 36 },
      { left: 92.1, top: 46.3, width: 7.9, height: 35.5 },
    ],
  },
  {
    name: "person",
    boxes: [
      { left: 31.2, top: 46.2, width: 6.9, height: 30.1 },
      { left: 85, top: 38.5, width: 4.8, height: 21.2 },
    ],
  },
  { name: "pallet-jack", boxes: [{ left: 46.2, top: 52.4, width: 14.5, height: 40.6 }] },
  { name: "forklift", boxes: [] },
];

/** A multi-select that stays open while the reader ticks several options, and shows the count on its trigger. */
export default function Labels() {
  const [selected, setSelected] = useState(["pallet", "person"]);
  const drawn = classes.filter((item) => selected.includes(item.name));

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-card">
      <div className="flex items-center justify-between gap-2 py-2 pr-2 pl-3.5">
        <span className="font-mono text-sm font-medium">frame-0184.jpg</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <TagsIcon data-icon="inline-start" />
              <span className="tabular-nums">Classes · {selected.length}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60" align="end">
            <PopoverHeader>
              <PopoverTitle>Classes</PopoverTitle>
              <PopoverDescription>Only these are drawn on the frame.</PopoverDescription>
            </PopoverHeader>
            <FieldGroup className="gap-2">
              {classes.map(({ name, boxes }) => (
                <Field key={name} orientation="horizontal">
                  <Checkbox
                    id={`pop-class-${name}`}
                    checked={selected.includes(name)}
                    onCheckedChange={(checked) =>
                      setSelected((current) =>
                        checked ? [...current, name] : current.filter((item) => item !== name),
                      )
                    }
                  />
                  <FieldLabel htmlFor={`pop-class-${name}`} className="flex-1 font-normal">
                    {name}
                  </FieldLabel>
                  <span className="text-muted-foreground tabular-nums">{boxes.length}</span>
                </Field>
              ))}
            </FieldGroup>
          </PopoverContent>
        </Popover>
      </div>
      <div className="relative aspect-video border-t">
        <img
          src="/assets/frames/dock.svg"
          alt="Camera frame of loading dock A with four roll-up doors, pallets and two workers"
          className="size-full object-cover"
        />
        {drawn.flatMap(({ name, boxes }) =>
          boxes.map((box) => (
            <span
              key={`${name}-${box.left}-${box.top}`}
              className="absolute rounded-sm border-2 border-info"
              style={{
                left: `${box.left}%`,
                top: `${box.top}%`,
                width: `${box.width}%`,
                height: `${box.height}%`,
              }}
            />
          )),
        )}
        <span className="absolute bottom-2 left-2 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium shadow-sm tabular-nums">
          {drawn.reduce((total, item) => total + item.boxes.length, 0)} detections drawn
        </span>
      </div>
    </div>
  );
}
