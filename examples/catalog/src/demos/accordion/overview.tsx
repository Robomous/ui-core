import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Label,
  Switch,
} from "@robomous/ui-core";

/** A run configuration: sections are headings, one is open, and the open one can hold real controls. */
export default function Overview() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">Run configuration</span>
          <span className="text-muted-foreground">run-0419 · pallet-detection</span>
        </div>
        <Badge variant="quiet">detector-v3.2</Badge>
      </div>
      <Accordion type="single" collapsible defaultValue="augmentation">
        <AccordionItem value="data">
          <AccordionTrigger>Data</AccordionTrigger>
          <AccordionContent>
            <dl className="flex flex-col gap-2">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Dataset</dt>
                <dd className="font-mono">pallet-detection</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Split</dt>
                <dd className="tabular-nums">80 / 10 / 10</dd>
              </div>
            </dl>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="optimizer">
          <AccordionTrigger>Optimizer</AccordionTrigger>
          <AccordionContent>
            <dl className="flex flex-col gap-2">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Algorithm</dt>
                <dd className="font-mono">AdamW</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Learning rate</dt>
                <dd className="font-mono tabular-nums">3e-4</dd>
              </div>
            </dl>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="augmentation">
          <AccordionTrigger>Augmentation</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="aug-flip">Horizontal flip</Label>
                <Switch id="aug-flip" size="sm" defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="aug-mosaic">Mosaic</Label>
                <Switch id="aug-mosaic" size="sm" defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="aug-blur">Motion blur</Label>
                <Switch id="aug-blur" size="sm" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
