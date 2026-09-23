import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@robomous/ui-core";

/** `type="multiple"`: every region opens independently, and a disabled item stays shut. */
export default function Multiple() {
  return (
    <Accordion type="multiple" defaultValue={["status"]} className="max-w-md">
      <AccordionItem value="status">
        <AccordionTrigger>Status</AccordionTrigger>
        <AccordionContent>Draft, approved, in annotation, completed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="assignee">
        <AccordionTrigger>Assignee</AccordionTrigger>
        <AccordionContent>Anyone on the project with the annotator role.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="model" disabled>
        <AccordionTrigger>Model predictions</AccordionTrigger>
        <AccordionContent>Available once a model has been trained.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
