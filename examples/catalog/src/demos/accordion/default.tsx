import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@robomous/ui-core";

/** `type="single" collapsible`: one region open at a time, and the open one closes again. */
export default function Default() {
  return (
    <Accordion type="single" collapsible defaultValue="general" className="max-w-md">
      <AccordionItem value="general">
        <AccordionTrigger>General</AccordionTrigger>
        <AccordionContent>
          <p>The project name, its description, and who can see it.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="labels">
        <AccordionTrigger>Labels</AccordionTrigger>
        <AccordionContent>
          <p>The classes annotators can pick from, and the colour each one is drawn in.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="export">
        <AccordionTrigger>Export</AccordionTrigger>
        <AccordionContent>
          <p>Which formats a release is written in, and how its splits are drawn.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
