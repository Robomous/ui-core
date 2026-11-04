import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@robomous/ui-core";
import { DatabaseIcon, UploadIcon } from "@robomous/ui-core/icons";

/** Two ways in: the primary action first, a quieter alternative beside it. */
export default function Actions() {
  return (
    <Empty className="w-full max-w-md border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <DatabaseIcon />
        </EmptyMedia>
        <EmptyTitle>No datasets yet</EmptyTitle>
        <EmptyDescription>
          Upload frames from this machine, or connect a bucket to import them in place.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center">
        <Button>
          <UploadIcon data-icon="inline-start" />
          Upload frames
        </Button>
        <Button variant="outline">Connect a bucket</Button>
      </EmptyContent>
    </Empty>
  );
}
