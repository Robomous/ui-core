import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@robomous/ui-core";

/** PopoverHeader stacks PopoverTitle and PopoverDescription; the rest of Content is free-form. */
export default function Rename() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Rename batch</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Rename</PopoverTitle>
          <PopoverDescription>Shown wherever this batch is listed.</PopoverDescription>
        </PopoverHeader>
        <Input defaultValue="batch-0012" aria-label="Batch name" />
        <Button size="sm">Save</Button>
      </PopoverContent>
    </Popover>
  );
}
