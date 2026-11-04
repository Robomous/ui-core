import { Button, CodeBlock } from "@robomous/ui-core";
import { PlayIcon } from "@robomous/ui-core/icons";

const code = `SELECT camera, count(*) AS detections
FROM detections
WHERE site = 'monterrey-dc-2' AND ts > now() - interval '1 hour'
GROUP BY camera
ORDER BY detections DESC;`;

/** `actions` adds controls to the header, ahead of the copy button. */
export default function Actions() {
  return (
    <CodeBlock
      filename="busiest-cameras.sql"
      code={code}
      className="w-full max-w-xl"
      actions={
        <Button variant="ghost" size="sm">
          <PlayIcon data-icon="inline-start" />
          Run query
        </Button>
      }
    />
  );
}
