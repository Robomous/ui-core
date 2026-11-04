import { CodeBlock } from "@robomous/ui-core";

const config = `{
  "robot": "rb-07",
  "mission": "restock-aisle-14",
  "waypoints": 6,
  "returnToDockAt": 0.2
}`;

const output = `rb-07  Atlas    docked      battery 82%
rb-12  Kestrel  on-mission  battery 47%
rb-19  Orca     charging    battery 19%`;

/** Without `filename` the header goes and the copy button floats in the corner; `showLineNumbers={false}` and `highlight={false}` suit plain output. */
export default function NoFilename() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Anonymous example</span>
        <CodeBlock language="json" code={config} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Plain output</span>
        <CodeBlock code={output} highlight={false} showLineNumbers={false} />
      </div>
    </div>
  );
}
