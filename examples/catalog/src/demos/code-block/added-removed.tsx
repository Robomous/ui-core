import { CodeBlock } from "@robomous/ui-core";

const code = `export default defineFleet({
  site: "monterrey-dc-2",
  maxSpeed: 1.2,
  maxSpeed: 0.8,
  lowBattery: 0.15,
  lowBattery: 0.2,
  telemetry: { interval: "5s" },
});`;

/** `addedLines` and `removedLines` mark a change; the copy drops the removed lines so a paste runs. */
export default function AddedRemoved() {
  return (
    <CodeBlock
      filename="fleet.config.ts"
      language="ts"
      code={code}
      removedLines={[3, 5]}
      addedLines={[4, 6]}
      className="w-full max-w-xl"
    />
  );
}
