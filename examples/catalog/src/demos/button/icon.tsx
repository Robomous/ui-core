import { Button } from "@robomous/ui-core";
import { PlusIcon, TrashIcon } from "lucide-react";

/** Square sizes for a bare icon. The label moves to `aria-label`. */
export default function Icon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="icon-xs" aria-label="Add, extra small">
        <PlusIcon />
      </Button>
      <Button size="icon-sm" aria-label="Add, small">
        <PlusIcon />
      </Button>
      <Button size="icon" aria-label="Add">
        <PlusIcon />
      </Button>
      <Button size="icon-lg" aria-label="Add, large">
        <PlusIcon />
      </Button>
      <Button variant="destructive" size="icon" aria-label="Delete">
        <TrashIcon />
      </Button>
    </div>
  );
}
