import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from "@robomous/ui-core";

const checks = [
  {
    value: "latency",
    title: "Latency",
    status: "pass",
    detail: "p95 is 38 ms on the Jetson Orin, under the 50 ms budget.",
  },
  {
    value: "accuracy",
    title: "Accuracy",
    status: "pass",
    detail: "mAP 0.71 on the held-out set, 2.3% above the model in production.",
  },
  {
    value: "memory",
    title: "Memory",
    status: "warn",
    detail: "Peak use is 3.4 GB of 4 GB. Consider the INT8 build before shipping to Nano devices.",
  },
] as const;

/** Triggers can carry more than a title: wrap the label and a Badge in one element so the chevron stays at the edge. */
export default function WithStatus() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">Pre-deploy checks · detector-v3.2</span>
        <span className="text-muted-foreground tabular-nums">2 of 3 passed</span>
      </div>
      <Accordion type="single" collapsible defaultValue="memory">
        {checks.map((check) => (
          <AccordionItem key={check.value} value={check.value}>
            <AccordionTrigger>
              <span className="flex flex-1 items-center gap-2">
                {check.title}
                <Badge variant={check.status === "pass" ? "success" : "warning"}>
                  {check.status === "pass" ? "passed" : "warning"}
                </Badge>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p>{check.detail}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
