import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@robomous/ui-core";

/** `size` is a Button size, passed to each link; use `sm` and `icon-sm` for a dense table footer. */
export default function Sizes() {
  return (
    <div className="grid w-fit grid-cols-[5.5rem_auto] items-center gap-x-8 gap-y-5">
      <span className="text-muted-foreground">default</span>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="?page=1" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=1">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=3">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="?page=3" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <span className="text-muted-foreground">sm · icon-sm</span>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="?page=1" size="sm" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=1" size="icon-sm">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=2" size="icon-sm" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=3" size="icon-sm">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="?page=3" size="sm" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
