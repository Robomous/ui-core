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
import { PencilIcon } from "@robomous/ui-core/icons";

/** PopoverHeader stacks PopoverTitle and PopoverDescription; the rest of Content is free-form. */
export default function Rename() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PencilIcon data-icon="inline-start" />
          Rename batch
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Rename batch</PopoverTitle>
          <PopoverDescription>Shown wherever this batch is listed.</PopoverDescription>
        </PopoverHeader>
        <Input defaultValue="batch-0042" aria-label="Batch name" className="font-mono" />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
          <Button size="sm">Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
