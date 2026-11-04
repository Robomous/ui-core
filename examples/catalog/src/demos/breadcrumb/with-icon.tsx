import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@robomous/ui-core";
import { HouseIcon } from "@robomous/ui-core/icons";

/** An icon-only root saves a word of width; it still needs an `aria-label` to have a name. */
export default function WithIcon() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-lg border p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" aria-label="Home">
              <HouseIcon className="size-3.5" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>API keys</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-1">
        <span className="text-base font-medium">API keys</span>
        <span className="text-muted-foreground tabular-nums">3 active · 1 expires in 6 days</span>
      </div>
      <div className="flex items-center justify-between gap-3 border-t pt-3">
        <span className="font-mono">rk_live_…8f2a</span>
        <Badge variant="warning">Expires in 6 days</Badge>
      </div>
    </div>
  );
}
