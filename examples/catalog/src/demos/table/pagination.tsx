import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@robomous/ui-core";
import { useState } from "react";

const JOBS = Array.from({ length: 125 }, (_, i) => 4128 - i);

/** `TablePagination` is a `<tfoot>`: the range on the left, the pager on the right. */
export default function Pagination() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageCount = Math.ceil(JOBS.length / pageSize);
  const rows = JOBS.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job</TableHead>
          <TableHead>Model</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((job) => (
          <TableRow key={job}>
            <TableCell className="font-mono">{job}</TableCell>
            <TableCell>rbm-det-3</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TablePagination
        colSpan={2}
        page={page}
        pageCount={pageCount}
        pageSize={pageSize}
        total={JOBS.length}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </Table>
  );
}
