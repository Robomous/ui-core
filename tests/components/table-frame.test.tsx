/**
 * TableFrame: its title names the table inside it, and an explicit label on the table still wins.
 * Tested by role and name, never by class string.
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Table,
  TableBody,
  TableCell,
  TableFrame,
  TableFrameHeader,
  TableFrameTitle,
  TableRow,
} from "../../src/components/table";

function body() {
  return (
    <TableBody>
      <TableRow>
        <TableCell>Atlas</TableCell>
      </TableRow>
    </TableBody>
  );
}

describe("TableFrame", () => {
  it("names the table after its title", () => {
    render(
      <TableFrame>
        <TableFrameHeader>
          <TableFrameTitle>Fleet monitor</TableFrameTitle>
        </TableFrameHeader>
        <Table>{body()}</Table>
      </TableFrame>,
    );
    expect(screen.getByRole("table", { name: "Fleet monitor" })).toBeTruthy();
  });

  it("leaves an aria-label on the table in charge", () => {
    render(
      <TableFrame>
        <TableFrameHeader>
          <TableFrameTitle>Fleet monitor</TableFrameTitle>
        </TableFrameHeader>
        <Table aria-label="Robots">{body()}</Table>
      </TableFrame>,
    );
    expect(screen.getByRole("table", { name: "Robots" })).toBeTruthy();
  });

  it("adds no reference when the frame has no title", () => {
    render(
      <TableFrame>
        <Table>{body()}</Table>
      </TableFrame>,
    );
    expect(screen.getByRole("table").hasAttribute("aria-labelledby")).toBe(false);
  });
});
