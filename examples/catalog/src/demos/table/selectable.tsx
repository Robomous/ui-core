import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";
import { DownloadIcon } from "@robomous/ui-core/icons";
import { useState } from "react";

const person = (slug: string) => `/assets/people/${slug}.svg`;

const hannah = { name: "Hannah Kim", initials: "HK", image: person("hannah-kim") };
const sofia = { name: "Sofia Brennan", initials: "SB", image: person("sofia-brennan") };
const jonas = { name: "Jonas Weber", initials: "JW", image: person("jonas-weber") };

const batches = [
  { id: "batch-0412", cover: "dock", frames: 2480, reviewer: hannah },
  { id: "batch-0413", cover: "conveyor", frames: 3120, reviewer: sofia },
  { id: "batch-0414", cover: "aisle-2", frames: 1904, reviewer: jonas },
  { id: "batch-0415", cover: "floor", frames: 2776, reviewer: hannah },
];

/** Set `data-state="selected"` on the row and it takes the selected surface; the checkbox column drops its right padding on its own. */
export default function Selectable() {
  const [selected, setSelected] = useState<string[]>(["batch-0413"]);
  const all = selected.length === batches.length;

  function toggle(id: string, checked: boolean) {
    setSelected((current) => (checked ? [...current, id] : current.filter((item) => item !== id)));
  }

  return (
    <div className="flex w-full max-w-xl flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground tabular-nums">
          {selected.length} of {batches.length} selected
        </p>
        <Button variant="outline" size="sm" disabled={selected.length === 0}>
          <DownloadIcon data-icon="inline-start" />
          Export
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                aria-label="Select all batches"
                checked={all ? true : selected.length > 0 ? "indeterminate" : false}
                onCheckedChange={(checked) =>
                  setSelected(checked === true ? batches.map((batch) => batch.id) : [])
                }
              />
            </TableHead>
            <TableHead>Batch</TableHead>
            <TableHead className="text-right">Frames</TableHead>
            <TableHead>Reviewer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batches.map((batch) => (
            <TableRow
              key={batch.id}
              data-state={selected.includes(batch.id) ? "selected" : undefined}
            >
              <TableCell>
                <Checkbox
                  aria-label={`Select ${batch.id}`}
                  checked={selected.includes(batch.id)}
                  onCheckedChange={(checked) => toggle(batch.id, checked === true)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={`/assets/frames/${batch.cover}.svg`}
                    alt=""
                    loading="lazy"
                    className="aspect-video h-8 rounded-sm object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
                  />
                  <span className="font-mono">{batch.id}</span>
                </div>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {batch.frames.toLocaleString("en-US")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <AvatarImage src={batch.reviewer.image} alt="" />
                    <AvatarFallback>{batch.reviewer.initials}</AvatarFallback>
                  </Avatar>
                  {batch.reviewer.name}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
