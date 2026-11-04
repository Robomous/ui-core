import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@robomous/ui-core";
import { PlusIcon, TimerIcon } from "@robomous/ui-core/icons";

/** `EmptyMedia` `variant="icon"` sets the icon in a muted square; `EmptyContent` holds the one action that resolves the panel. */
export default function Icon() {
  return (
    <Empty className="w-full max-w-md border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TimerIcon />
        </EmptyMedia>
        <EmptyTitle>No training runs yet</EmptyTitle>
        <EmptyDescription>
          Start a run to fine-tune detector-v3.2 on your latest batch.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon data-icon="inline-start" />
          Start a run
        </Button>
      </EmptyContent>
    </Empty>
  );
}
