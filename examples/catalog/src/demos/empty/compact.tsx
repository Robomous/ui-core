import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@robomous/ui-core";
import { BellIcon } from "@robomous/ui-core/icons";

/** In a small surface, trim the padding with `className` and the panel shrinks to fit. */
export default function Compact() {
  return (
    <div className="w-full max-w-xs rounded-lg border">
      <div className="border-b px-3 py-2 text-sm font-medium">Notifications</div>
      <Empty className="px-4 py-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BellIcon />
          </EmptyMedia>
          <EmptyTitle className="text-sm">You're all caught up</EmptyTitle>
          <EmptyDescription>Run and fleet alerts will land here.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
