import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@robomous/ui-core";
import { CameraIcon } from "@robomous/ui-core/icons";

/** `variant="default"` leaves the icon unstyled, for a larger mark that carries the panel on its own instead of sitting in a chip. */
export default function DefaultMedia() {
  return (
    <Empty className="w-full max-w-md border border-dashed">
      <EmptyHeader>
        <EmptyMedia>
          <CameraIcon className="size-10 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle>No cameras connected</EmptyTitle>
        <EmptyDescription>
          Connect a camera to start streaming frames into this dataset.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
