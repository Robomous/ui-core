import { Avatar, AvatarFallback, AvatarImage, Button, SearchInput } from "@robomous/ui-core";
import { BellIcon } from "@robomous/ui-core/icons";

/** The app header's search: the one field on the page that owns ⌘K, between the product's own navigation and actions. */
export default function Overview() {
  return (
    <header className="flex w-full max-w-2xl items-center gap-3 rounded-xl border p-2 pl-4">
      <span className="text-sm font-semibold tracking-tight">Robomous</span>
      <nav aria-label="Primary" className="hidden items-center gap-1 sm:flex">
        <Button variant="ghost" size="sm">
          Datasets
        </Button>
        <Button variant="ghost" size="sm">
          Models
        </Button>
        <Button variant="ghost" size="sm">
          Fleet
        </Button>
      </nav>
      <SearchInput
        shortcut
        aria-label="Search the workspace"
        placeholder="Search datasets, models, robots…"
        className="flex-1"
      />
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <BellIcon />
      </Button>
      <Avatar size="sm">
        <AvatarImage src="/assets/people/sofia-brennan.svg" alt="Sofia Brennan" />
        <AvatarFallback>SB</AvatarFallback>
      </Avatar>
    </header>
  );
}
