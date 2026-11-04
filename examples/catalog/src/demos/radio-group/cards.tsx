import {
  Badge,
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
  RadioGroup,
  RadioGroupItem,
} from "@robomous/ui-core";
import { CloudIcon, CpuIcon, WorkflowIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const targets = [
  {
    value: "cloud",
    title: "Cloud GPU",
    description: "Autoscaled, around 40 ms per frame.",
    icon: CloudIcon,
    badge: "Recommended",
  },
  {
    value: "edge",
    title: "Edge device",
    description: "Runs on the robot, no network needed.",
    icon: CpuIcon,
  },
  {
    value: "hybrid",
    title: "Hybrid",
    description: "Edge first, falls back to the cloud.",
    icon: WorkflowIcon,
  },
];

/** A `FieldLabel` that wraps the whole `Field` becomes the card: it takes the border, the hover and the tint of the checked option. */
export default function Cards() {
  const [target, setTarget] = useState("cloud");

  return (
    <FieldSet className="w-full max-w-md">
      <FieldLegend variant="label">Run detector-v3.2 on</FieldLegend>
      <RadioGroup value={target} onValueChange={setTarget}>
        {targets.map((t) => (
          <FieldLabel key={t.value} htmlFor={`rg-card-${t.value}`}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>
                  <t.icon className="size-3.5 text-muted-foreground" aria-hidden />
                  {t.title}
                  {t.badge ? <Badge variant="secondary">{t.badge}</Badge> : null}
                </FieldTitle>
                <FieldDescription>{t.description}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value={t.value} id={`rg-card-${t.value}`} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  );
}
