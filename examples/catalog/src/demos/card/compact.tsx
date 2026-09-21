import { Card, CardDescription, CardHeader, CardTitle } from "@robomous/ui-core";

/** `size="sm"` tightens `--card-spacing`, and `CardTitle` steps down to `text-sm` with it. */
export default function Compact() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Card size="sm">
        <CardHeader>
          <CardTitle>Storage</CardTitle>
          <CardDescription>1.8 TB of 4 TB used</CardDescription>
        </CardHeader>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>Annotators</CardTitle>
          <CardDescription>6 active this week</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
