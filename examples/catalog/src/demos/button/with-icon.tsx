import { Button } from "@robomous/ui-core";
import { ArrowRightIcon, PlusIcon } from "@robomous/ui-core/icons";

/** An icon reads as part of the label: `data-icon` tells the button which side to pad. */
export default function WithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>
        <PlusIcon data-icon="inline-start" />
        New batch
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRightIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}
