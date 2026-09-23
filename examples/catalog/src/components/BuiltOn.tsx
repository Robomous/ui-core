import { Badge, Button } from "@robomous/ui-core";
import { ExternalLinkIcon } from "@robomous/ui-core/icons";

export interface BuiltOnEntry {
  name: string;
  docsUrl: string;
  apiUrl?: string;
}

/** Where the component's behaviour comes from, with the upstream docs one click away. */
export default function BuiltOn({ builtOn }: { builtOn: BuiltOnEntry[] }) {
  const names = builtOn.map((entry) => entry.name);
  const sentence =
    names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
  const primary = builtOn[0];
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl bg-muted/40 px-4 py-2 text-sm ring-1 ring-foreground/10">
      {builtOn.map((entry) => (
        <Badge key={entry.name} variant="secondary">
          {entry.name}
        </Badge>
      ))}
      <span className="text-muted-foreground">This component uses {sentence}.</span>
      {primary ? (
        <Button asChild variant="link" size="inline" className="ml-auto">
          {/* One way out of the page: the upstream API, or its docs where there is no
              separate API page (cmdk, a native element). */}
          <a href={primary.apiUrl ?? primary.docsUrl} target="_blank" rel="noreferrer">
            API Reference
            <ExternalLinkIcon data-icon="inline-end" />
          </a>
        </Button>
      ) : null}
    </div>
  );
}
