import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@robomous/ui-core";
import { InboxIcon, PlusIcon } from "lucide-react";

/** `EmptyMedia` `variant="icon"` sets the icon in a muted square; `EmptyContent` holds the one action that resolves the panel. */
export default function Icon() {
  return (
    <Empty className="w-full max-w-md border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No batches yet</EmptyTitle>
        <EmptyDescription>
          Upload a batch to start labelling. Nothing is lost while you wait.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon data-icon="inline-start" />
          Upload a batch
        </Button>
      </EmptyContent>
    </Empty>
  );
}
