import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@robomous/ui-core";

/** `TableFooter` closes the table with a muted band for a total, and `TableCaption` names the table for assistive technology. */
export default function Footer() {
  return (
    <div className="w-full max-w-md">
      <Table>
        <TableCaption>Usage for November, billed to the Monterrey workspace.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Resource</TableHead>
            <TableHead className="text-right">Usage</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>GPU hours</TableCell>
            <TableCell className="text-right tabular-nums">412 h</TableCell>
            <TableCell className="text-right tabular-nums">$1,236.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Storage</TableCell>
            <TableCell className="text-right tabular-nums">1.8 TB</TableCell>
            <TableCell className="text-right tabular-nums">$41.40</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Inference requests</TableCell>
            <TableCell className="text-right tabular-nums">2.4M</TableCell>
            <TableCell className="text-right tabular-nums">$96.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right tabular-nums">$1,373.40</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
