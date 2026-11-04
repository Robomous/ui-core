import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Badge,
} from "@robomous/ui-core";

/** Cap the width of a crumb that can hold a user-chosen name; the full text stays in `title`. */
export default function LongNames() {
  const run = "run-0412-detector-v3.2-finetune-low-light-warehouse-night-shift";

  return (
    <div className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-4">
      <Breadcrumb className="w-full">
        <BreadcrumbList className="flex-nowrap">
          <BreadcrumbItem>
            <BreadcrumbLink href="/runs">Runs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="min-w-0">
            <BreadcrumbPage className="truncate" title={run}>
              {run}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center gap-2">
        <Badge variant="info">Running · 62%</Badge>
        <span className="text-muted-foreground tabular-nums">epoch 25 of 40</span>
      </div>
      <span className="text-muted-foreground">Hover the last crumb to read the full name.</span>
    </div>
  );
}
