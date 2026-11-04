import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@robomous/ui-core";
import { useState } from "react";

const sections = [
  ["labels", "Labels", "Pallet, forklift, person, box and damaged-box: 5 classes, 58,213 boxes."],
  ["splits", "Splits", "14,563 train, 1,820 validation and 1,821 test frames across 41 batches."],
  ["sources", "Sources", "Three cameras on Monterrey DC-2, last synced 14 minutes ago."],
];

/** Controlled with `value` and `onValueChange`, so buttons outside the accordion can open or close every section. */
export default function Controlled() {
  const [open, setOpen] = useState<string[]>(["labels"]);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">pallet-detection</span>
          <span className="text-muted-foreground tabular-nums">
            {open.length} of {sections.length} sections open
          </span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="xs"
            disabled={open.length === sections.length}
            onClick={() => setOpen(sections.map(([value]) => value))}
          >
            Expand all
          </Button>
          <Button
            variant="ghost"
            size="xs"
            disabled={open.length === 0}
            onClick={() => setOpen([])}
          >
            Collapse all
          </Button>
        </div>
      </div>
      <Accordion type="multiple" value={open} onValueChange={setOpen}>
        {sections.map(([value, title, body]) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>{body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
