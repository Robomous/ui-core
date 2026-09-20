import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";

/** `TableFooter` closes the table with a muted, bordered band for a total, not another data row. */
export default function Footer() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Camera</TableHead>
          <TableHead className="text-right">Frames</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono">cam-b07</TableCell>
          <TableCell className="text-right tabular-nums">12,480</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-mono">cam-b08</TableCell>
          <TableCell className="text-right tabular-nums">9,204</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right tabular-nums">21,684</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
