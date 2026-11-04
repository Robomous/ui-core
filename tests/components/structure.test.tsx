/**
 * Structure that assistive technology reads: a toggle group's arrow keys follow
 * its axis, a progress bar fills by its share of `max`, an item inside a group
 * is a list item, and a table too wide for its frame can be reached and
 * scrolled from the keyboard.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { Item, ItemGroup } from "../../src/components/item";
import { Progress } from "../../src/components/progress";
import { Table, TableBody, TableCell, TableRow } from "../../src/components/table";
import { ToggleGroup, ToggleGroupItem } from "../../src/components/toggle-group";

describe("ToggleGroup", () => {
  it("hands its orientation to the roving focus, so a vertical group moves on the up and down arrows", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single" orientation="vertical" aria-label="Tool">
        <ToggleGroupItem value="box">Box</ToggleGroupItem>
        <ToggleGroupItem value="polygon">Polygon</ToggleGroupItem>
      </ToggleGroup>,
    );
    const box = screen.getByRole("radio", { name: "Box" });
    const polygon = screen.getByRole("radio", { name: "Polygon" });
    box.focus();
    // The cross axis does nothing: without the orientation every arrow would move.
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(box);
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(polygon);
  });
});

describe("Progress", () => {
  const indicator = () =>
    document.querySelector<HTMLElement>('[data-slot="progress-indicator"]')!.style.transform;

  it("fills by the share of max", () => {
    render(<Progress value={3} max={12} aria-label="Batches" />);
    expect(indicator()).toBe("translateX(-75%)");
    expect(screen.getByRole("progressbar").getAttribute("aria-valuemax")).toBe("12");
  });

  it("reads value as a percentage when max is left alone", () => {
    render(<Progress value={40} aria-label="Upload" />);
    expect(indicator()).toBe("translateX(-60%)");
  });
});

describe("Item", () => {
  it("is a list item inside a group and a plain row outside one", () => {
    render(
      <>
        <ItemGroup>
          <Item>Inside</Item>
        </ItemGroup>
        <Item>Outside</Item>
      </>,
    );
    expect(screen.getByRole("list").children).toHaveLength(1);
    expect(screen.getByRole("listitem").textContent).toBe("Inside");
    expect(screen.getByText("Outside").getAttribute("role")).toBeNull();
  });

  it("steps its padding down with size, so sm is tighter than default and xs tighter still", () => {
    render(
      <>
        <Item>Default</Item>
        <Item size="sm">Small</Item>
        <Item size="xs">Extra small</Item>
      </>,
    );
    const padding = (name: string) => screen.getByText(name).className.match(/\bpy-[\d.]+\b/)?.[0];
    expect([padding("Default"), padding("Small"), padding("Extra small")]).toEqual([
      "py-2.5",
      "py-2",
      "py-1.5",
    ]);
  });

  it("keeps a link a link when it renders through asChild", () => {
    render(
      <ItemGroup>
        <Item asChild>
          <a href="/runs/418">Run 418</a>
        </Item>
      </ItemGroup>,
    );
    expect(screen.getByRole("link", { name: "Run 418" })).toBeTruthy();
  });
});

describe("Table", () => {
  const widths = Object.getOwnPropertyDescriptors(Element.prototype);
  afterEach(() => {
    Object.defineProperty(Element.prototype, "scrollWidth", widths.scrollWidth!);
    Object.defineProperty(Element.prototype, "clientWidth", widths.clientWidth!);
  });

  function setWidths(scroll: number, client: number) {
    Object.defineProperty(Element.prototype, "scrollWidth", {
      configurable: true,
      get: () => scroll,
    });
    Object.defineProperty(Element.prototype, "clientWidth", {
      configurable: true,
      get: () => client,
    });
  }

  const table = (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>dep-2291</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
  const frame = () => document.querySelector<HTMLElement>('[data-slot="table-container"]')!;

  it("becomes a tab stop when it is wider than its frame", () => {
    setWidths(900, 400);
    render(table);
    expect(frame().tabIndex).toBe(0);
  });

  it("adds no tab stop when it fits", () => {
    setWidths(400, 400);
    render(table);
    expect(frame().hasAttribute("tabindex")).toBe(false);
  });
});
