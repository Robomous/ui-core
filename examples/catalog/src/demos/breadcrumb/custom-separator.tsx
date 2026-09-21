import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@robomous/ui-core";
import { SlashIcon } from "lucide-react";

/** BreadcrumbSeparator accepts children: swap the chevron for anything else and it stays aria-hidden either way. */
export default function CustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/models">Models</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>detector-v3</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
