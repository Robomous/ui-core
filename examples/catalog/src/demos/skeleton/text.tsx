import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@robomous/ui-core";

/** Row placeholders: an avatar beside two lines, repeated for a members list that is still loading. */
export default function Text() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Annotation team</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4" aria-busy="true">
        {[
          ["w-2/5", "w-3/5"],
          ["w-1/2", "w-2/3"],
          ["w-1/3", "w-1/2"],
        ].map(([name, role], row) => (
          <div key={row} className="flex items-center gap-3">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className={`h-4 ${name}`} />
              <Skeleton className={`h-3 ${role}`} />
            </div>
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
