import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
} from "@robomous/ui-core";
import { BellIcon } from "@robomous/ui-core/icons";

/** Ancestors are links; the current page is a BreadcrumbPage, which is marked `aria-current` and not pressable. */
export default function Trail() {
  return (
    <div className="flex w-full max-w-md items-center justify-between gap-4 rounded-lg border py-1.5 pr-1.5 pl-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/models">Models</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/models/detector-v3-2">detector-v3.2</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Evaluation</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <BellIcon />
        </Button>
        <Avatar size="sm">
          <AvatarImage src="/assets/people/lena-fischer.svg" alt="Lena Fischer" />
          <AvatarFallback>LF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
