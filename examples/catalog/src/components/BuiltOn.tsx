import { ExternalLinkIcon } from "@robomous/ui-core/icons";

export interface BuiltOnEntry {
  name: string;
  docsUrl: string;
  apiUrl?: string;
}

/** Where the component's behaviour comes from, with the upstream docs one click away. */
export default function BuiltOn({ builtOn }: { builtOn: BuiltOnEntry[] }) {
  const primary = builtOn[0];
  if (!primary) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
      Built on
      {builtOn.map((entry, index) => (
        <span key={entry.name}>
          {index > 0 ? (index === builtOn.length - 1 ? " and " : ", ") : null}
          <a
            href={entry.docsUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {entry.name}
          </a>
        </span>
      ))}
      <span aria-hidden="true">·</span>
      {/* One way out of the page: the upstream API, or its docs where there is no
          separate API page (cmdk, a native element). */}
      <a
        href={primary.apiUrl ?? primary.docsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 underline-offset-4 hover:text-foreground hover:underline"
      >
        API reference
        <ExternalLinkIcon className="size-3.5" />
      </a>
    </p>
  );
}
