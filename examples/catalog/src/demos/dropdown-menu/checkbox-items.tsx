import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";
import { Columns3Icon } from "@robomous/ui-core/icons";
import { useState } from "react";

const labels = {
  map: "mAP",
  loss: "Validation loss",
  gpu: "GPU node",
  duration: "Duration",
};

type Column = keyof typeof labels;

const runs = [
  { id: "run-0188", map: "0.71", loss: "0.214", gpu: "gpu-a100-01", duration: "2h 14m" },
  { id: "run-0187", map: "0.68", loss: "0.251", gpu: "gpu-a100-02", duration: "3h 02m" },
  { id: "run-0186", map: "0.12", loss: "1.482", gpu: "gpu-l4-01", duration: "0h 21m" },
] satisfies ({ id: string } & Record<Column, string>)[];

/** `onSelect` with `preventDefault` keeps the menu open, and "All columns" wears a dash when only some are on. */
export default function CheckboxItems() {
  const [columns, setColumns] = useState<Record<Column, boolean>>({
    map: true,
    loss: false,
    gpu: true,
    duration: false,
  });
  const values = Object.values(columns);
  const all = values.every(Boolean);
  const some = values.some(Boolean);
  const keepOpen = (event: Event) => event.preventDefault();

  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">Training runs</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns3Icon data-icon="inline-start" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Run columns</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={all ? true : some ? "indeterminate" : false}
              onCheckedChange={(checked) =>
                setColumns({
                  map: checked === true,
                  loss: checked === true,
                  gpu: checked === true,
                  duration: checked === true,
                })
              }
              onSelect={keepOpen}
            >
              All columns
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            {(Object.keys(labels) as Column[]).map((column) => (
              <DropdownMenuCheckboxItem
                key={column}
                checked={columns[column]}
                onCheckedChange={(checked) =>
                  setColumns((current) => ({ ...current, [column]: checked }))
                }
                onSelect={keepOpen}
              >
                {labels[column]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Run</TableHead>
            {(Object.keys(labels) as Column[])
              .filter((column) => columns[column])
              .map((column) => (
                <TableHead key={column} className="text-right">
                  {labels[column]}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {runs.map((run) => (
            <TableRow key={run.id}>
              <TableCell className="font-mono">{run.id}</TableCell>
              {(Object.keys(labels) as Column[])
                .filter((column) => columns[column])
                .map((column) => (
                  <TableCell key={column} className="text-right tabular-nums">
                    {run[column]}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
