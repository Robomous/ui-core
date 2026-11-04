import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@robomous/ui-core";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

type Key = "model" | "map50";

const models = [
  { model: "detector-v3.2", map50: 0.712 },
  { model: "detector-v3.1", map50: 0.694 },
  { model: "segmenter-v1.4", map50: 0.634 },
  { model: "tracker-v0.9", map50: 0.681 },
];

/** The table doesn't sort for you: the header holds a button, and `aria-sort` on the `th` tells assistive technology which column is ordered. */
export default function Sortable() {
  const [sort, setSort] = useState<{ key: Key; dir: "asc" | "desc" }>({
    key: "map50",
    dir: "desc",
  });

  const rows = [...models].sort((a, b) => {
    const result = sort.key === "model" ? a.model.localeCompare(b.model) : a.map50 - b.map50;
    return sort.dir === "asc" ? result : -result;
  });

  function toggle(key: Key) {
    setSort((current) =>
      current.key === key
        ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }

  function header(key: Key, label: string, align?: string) {
    const active = sort.key === key;
    const Icon = !active ? ChevronsUpDownIcon : sort.dir === "asc" ? ArrowUpIcon : ArrowDownIcon;
    return (
      <TableHead
        className={align}
        aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
      >
        <button
          type="button"
          onClick={() => toggle(key)}
          className="inline-flex items-center gap-1.5 rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          {label}
          <Icon />
        </button>
      </TableHead>
    );
  }

  return (
    <div className="w-full max-w-md">
      <Table>
        <TableHeader>
          <TableRow>
            {header("model", "Model")}
            {header("map50", "mAP@50", "text-right")}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.model}>
              <TableCell className="font-mono">{row.model}</TableCell>
              <TableCell className="text-right tabular-nums">{row.map50.toFixed(3)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
