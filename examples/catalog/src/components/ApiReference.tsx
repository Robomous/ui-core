import type { ApiPart, ApiProp, ComponentApi } from "@/lib/api";

const code = "rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground";

/** `React.ComponentProps<typeof X.Root>` reads as `X.Root`; `<"div">` as `<div>`. */
function base(type: string): string {
  const primitive = /^React\.ComponentProps<typeof (.+)>$/.exec(type);
  if (primitive) return primitive[1]!;
  const element = /^React\.ComponentProps<"(\w+)">$/.exec(type);
  if (element) return `<${element[1]}>`;
  return type;
}

/** A part whose only own prop is `className` says nothing a table would add. */
function isThin(part: ApiPart): boolean {
  return part.props.every((prop) => prop.name === "className");
}

/**
 * The generated API, split by how much there is to say. Parts that declare
 * real props get a table each; the rest — the slots that only forward their
 * primitive's props and a `className` — share one compact list, so the page
 * leads with the props a reader will actually set.
 */
export default function ApiReference({ api }: { api: ComponentApi }) {
  const rich = api.parts.filter((part) => !isThin(part));
  const thin = api.parts.filter(isThin);
  return (
    <div className="flex flex-col gap-10">
      {rich.map((part) => (
        <section key={part.name} className="flex flex-col gap-3">
          <h3
            id={`api-${part.name.toLowerCase()}`}
            className="docs-anchor scroll-mt-20 font-mono text-base font-medium"
          >
            {part.name}
          </h3>
          {part.extends.length > 0 ? <Extends names={part.extends} /> : null}
          <PropList props={part.props} />
        </section>
      ))}
      {thin.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h3 id="api-parts" className="docs-anchor scroll-mt-20 text-base font-semibold">
            {rich.length > 0 ? "Other parts" : "Parts"}
          </h3>
          <p className="text-sm text-pretty text-muted-foreground">
            Each forwards every prop of what it wraps, plus <code className={code}>className</code>,
            merged after the component's own classes.
          </p>
          <ul className="divide-y overflow-hidden rounded-md border text-sm">
            {thin.map((part) => (
              <li
                key={part.name}
                id={`api-${part.name.toLowerCase()}`}
                className="grid scroll-mt-20 gap-1 px-4 py-3 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4"
              >
                <span className="font-mono text-[13px] font-medium">{part.name}</span>
                <span className="font-mono text-xs leading-5 break-words text-muted-foreground">
                  {part.extends.map(base).join(" & ") || "—"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {api.helpers.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          Also exported:{" "}
          {api.helpers.map((helper, index) => (
            <span key={helper}>
              {index > 0 ? ", " : ""}
              <code className={code}>{helper}</code>
            </span>
          ))}
          .
        </p>
      ) : null}
    </div>
  );
}

function Extends({ names }: { names: string[] }) {
  return (
    <p className="text-sm text-pretty text-muted-foreground">
      Extends{" "}
      {names.map((name, index) => (
        <span key={name}>
          {index > 0 ? " and " : ""}
          <code className={code}>{base(name)}</code>
        </span>
      ))}
      .
    </p>
  );
}

/** Props as hairline rows: three columns from md up, stacked below it. */
function PropList({ props }: { props: ApiProp[] }) {
  return (
    <div className="overflow-hidden rounded-md border text-sm">
      <div className="hidden grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,8rem)] gap-4 border-b bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground md:grid">
        <span>Prop</span>
        <span>Type</span>
        <span>Default</span>
      </div>
      <dl className="divide-y">
        {props.map((prop) => (
          <div
            key={prop.name}
            className="grid gap-1.5 px-4 py-3 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_minmax(0,8rem)] md:gap-4"
          >
            <dt className="flex items-baseline gap-1.5 font-mono text-[13px] font-medium">
              {prop.name}
              {prop.required ? (
                <span className="font-sans text-[11px] font-normal text-muted-foreground">
                  required
                </span>
              ) : null}
            </dt>
            <dd className="flex min-w-0 flex-col gap-1">
              <span className="font-mono text-xs leading-5 break-words text-info">{prop.type}</span>
              {prop.description ? (
                <span className="text-sm text-pretty text-muted-foreground">
                  {prop.description}
                </span>
              ) : null}
            </dd>
            <dd className="font-mono text-xs leading-5 text-muted-foreground">
              <span className="text-muted-foreground md:hidden">Default: </span>
              {prop.default || "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
