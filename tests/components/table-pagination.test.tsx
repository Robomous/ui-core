/**
 * TablePagination: the pager's names, its disabled ends and the range it announces. Tested by
 * role and name, never by class string.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Table, TablePagination } from "../../src/components/table";

function pager(props: Partial<React.ComponentProps<typeof TablePagination>> = {}) {
  return render(
    <Table>
      <TablePagination page={1} pageCount={13} pageSize={10} total={125} {...props} />
    </Table>,
  );
}

describe("TablePagination", () => {
  it("names the four pager buttons and disables the first and previous on page one", () => {
    pager();
    expect(screen.getByRole("button", { name: "First page" })).toHaveProperty("disabled", true);
    expect(screen.getByRole("button", { name: "Previous page" })).toHaveProperty("disabled", true);
    expect(screen.getByRole("button", { name: "Next page" })).toHaveProperty("disabled", false);
    expect(screen.getByRole("button", { name: "Last page" })).toHaveProperty("disabled", false);
  });

  it("disables next and last on the last page, keeping their names", () => {
    pager({ page: 13 });
    expect(screen.getByRole("button", { name: "Next page" })).toHaveProperty("disabled", true);
    expect(screen.getByRole("button", { name: "Last page" })).toHaveProperty("disabled", true);
    expect(screen.getByText("121–125")).toBeTruthy();
  });

  it("reports the target page", async () => {
    const onPageChange = vi.fn();
    pager({ page: 2, onPageChange });
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    await userEvent.click(screen.getByRole("button", { name: "Last page" }));
    expect(onPageChange.mock.calls).toEqual([[3], [13]]);
  });

  it("announces the range in a polite live region", () => {
    pager({ page: 2 });
    expect(screen.getByText("11–20").parentElement?.getAttribute("aria-live")).toBe("polite");
  });

  it("is a count only with one page, and has no pager", () => {
    pager({ pageCount: 1, total: 3, unit: "runs" });
    expect(screen.getByText("3")).toBeTruthy();
    expect(screen.getByText("runs")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("disables the pager while the count loads", () => {
    pager({ loading: true });
    expect(screen.getByRole("button", { name: "Next page" })).toHaveProperty("disabled", true);
    expect(screen.queryByText("1–10")).toBeNull();
  });
});
