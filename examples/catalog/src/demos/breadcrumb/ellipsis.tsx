import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@robomous/ui-core";

/** The collapsed crumbs move into a menu, so a deep trail stays short and nothing becomes unreachable. */
export default function Ellipsis() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-xl border p-2">
      <div className="px-1.5 pt-1">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/fleet">Fleet</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Show hidden pages"
                  className="flex items-center rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <a href="/fleet/monterrey">Monterrey</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/fleet/monterrey/dc-2">DC-2</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/fleet/monterrey/dc-2/aisle-14">Aisle 14</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>rb-07 Atlas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-3 px-1.5 pb-1.5">
        <img
          src="/assets/robots/atlas.svg"
          alt=""
          loading="lazy"
          className="size-10 rounded-md object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
        />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">rb-07 Atlas</span>
          <span className="text-muted-foreground">
            Monterrey and DC-2 are folded into the menu.
          </span>
        </div>
      </div>
    </div>
  );
}
