import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@robomous/ui-core";
import { MenuIcon } from "lucide-react";

import DocsSidebar from "@/components/DocsSidebar";
import type { Nav } from "@/lib/nav";

/** Under the md breakpoint the sidebar lives in a Sheet behind a menu button. */
export default function MobileNav({ nav, current }: { nav: Nav; current: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label="Open navigation">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 gap-0 overflow-y-auto px-4">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Sections and components of the documentation.</SheetDescription>
        </SheetHeader>
        <DocsSidebar nav={nav} current={current} />
      </SheetContent>
    </Sheet>
  );
}
