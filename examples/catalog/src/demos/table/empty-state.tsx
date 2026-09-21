import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@robomous/ui-core";

/** An empty result set stays inside the table: one row, spanning every column, carries the message. */
export default function EmptyState() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Batch</TableHead>
          <TableHead>Frames</TableHead>
          <TableHead>State</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="py-6 text-center text-muted-foreground">
            No batches match this filter.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
