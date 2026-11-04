import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  FilterParamsBar,
  type FilterDefinition,
  type FilterValues,
} from "@robomous/ui-core";
import { useState } from "react";

const portrait = (slug: string) => `/assets/people/${slug}.svg`;

const PEOPLE = {
  daniel: { name: "Daniel Okafor", initials: "DO", photo: portrait("daniel-okafor") },
  mei: { name: "Mei Tanaka", initials: "MT", photo: portrait("mei-tanaka") },
  hannah: { name: "Hannah Kim", initials: "HK", photo: portrait("hannah-kim") },
};

const RUNS = [
  { id: "run-0419", author: "daniel", model: "detector-v3.3-rc", date: "Oct 28, 14:32" },
  { id: "run-0412", author: "mei", model: "detector-v3.2", date: "Oct 21, 09:05" },
  { id: "run-0408", author: "hannah", model: "segmenter-v1.4", date: "Oct 17, 18:47" },
  { id: "run-0405", author: "daniel", model: "detector-v3.2", date: "Oct 14, 11:20" },
] as const;

const filters: FilterDefinition[] = [
  {
    id: "site",
    label: "Site",
    options: [{ value: "mty", label: "Monterrey DC-2" }],
    readonly: true,
    note: "This page lists the runs of the site you are in. Switch sites from the sidebar.",
  },
  {
    id: "author",
    label: "Started by",
    options: Object.entries(PEOPLE).map(([value, person]) => ({ value, label: person.name })),
  },
];

/** A `readonly` filter shows the page's context without letting it be removed; `note` explains it. */
export default function Readonly() {
  const [values, setValues] = useState<FilterValues>({ site: "mty" });
  const shown = RUNS.filter((run) => !values.author || run.author === values.author);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border">
      <div className="border-b p-4">
        <FilterParamsBar filters={filters} values={values} onValuesChange={setValues} />
      </div>
      <ul className="flex flex-col divide-y">
        {shown.map((run) => {
          const person = PEOPLE[run.author];
          return (
            <li key={run.id} className="flex items-center gap-3 px-4 py-2.5">
              <Avatar size="sm">
                <AvatarImage src={person.photo} alt="" />
                <AvatarFallback>{person.initials}</AvatarFallback>
              </Avatar>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-medium">{person.name}</span>
                <span className="truncate font-mono text-muted-foreground">
                  {run.id} · {run.model}
                </span>
              </span>
              <span className="ml-auto text-muted-foreground tabular-nums">{run.date}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
