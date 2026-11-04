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
} from "@robomous/ui-core";
import { SlashIcon } from "@robomous/ui-core/icons";

/** BreadcrumbSeparator takes children: swap the chevron for any glyph and it stays `aria-hidden`. */
export default function CustomSeparator() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-lg border p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/robomous">robomous</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/robomous/warehouse-fleet">warehouse-fleet</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>deployments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-2 border-t pt-3 text-muted-foreground">
        <Avatar size="sm">
          <AvatarImage src="/assets/people/hannah-kim.svg" alt="" />
          <AvatarFallback>HK</AvatarFallback>
        </Avatar>
        <span>Hannah Kim · organisation / project / resource</span>
      </div>
    </div>
  );
}
