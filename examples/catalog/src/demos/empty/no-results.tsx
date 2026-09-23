import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@robomous/ui-core";
import { SearchIcon } from "@robomous/ui-core/icons";

/** No `EmptyContent`: some panels only need to say why the list is empty, with nothing to do about it. */
export default function NoResults() {
  return (
    <Empty className="w-full max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No batches match this filter</EmptyTitle>
        <EmptyDescription>Try a different reviewer, or clear the state filter.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
