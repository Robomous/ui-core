import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@robomous/ui-core";

import type { ComponentApi } from "@/lib/api";

/** One table per exported part: the props it declares, then what else it accepts. */
export default function ApiReference({ api }: { api: ComponentApi }) {
  return (
    <div className="flex flex-col gap-10">
      {api.parts.map((part) => (
        <section key={part.name} className="flex flex-col gap-3">
          <h3 id={`api-${part.name.toLowerCase()}`} className="font-mono text-base font-medium">
            {part.name}
          </h3>
          {part.extends.length > 0 ? (
            <p className="text-sm text-muted-foreground">
              Accepts every prop of{" "}
              {part.extends.map((name, index) => (
                <span key={name}>
                  {index > 0 ? " and " : ""}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                    {name}
                  </code>
                </span>
              ))}
              {part.props.length > 0 ? ", plus:" : "."}
            </p>
          ) : null}
          {part.props.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40">Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-32">Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {part.props.map((prop) => (
                  <TableRow key={prop.name}>
                    <TableCell className="font-mono text-xs">
                      {prop.name}
                      {prop.required ? null : <span className="text-muted-foreground">?</span>}
                    </TableCell>
                    <TableCell className="font-mono text-xs whitespace-normal">
                      {prop.type}
                      {prop.description ? (
                        <p className="mt-1 font-sans text-sm text-muted-foreground">
                          {prop.description}
                        </p>
                      ) : null}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {prop.default || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}
        </section>
      ))}
      {api.helpers.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          Also exported:{" "}
          {api.helpers.map((helper, index) => (
            <span key={helper}>
              {index > 0 ? ", " : ""}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">{helper}</code>
            </span>
          ))}
          .
        </p>
      ) : null}
    </div>
  );
}
