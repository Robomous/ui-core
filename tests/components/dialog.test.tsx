/**
 * Dialog and Sheet: the guarantees Radix makes and this package must not
 * break by wrapping — focus moves in and comes back, Escape closes, the close
 * control is a real button, and the title/description relationships are wired.
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/dialog";
import { Input } from "../../src/components/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../src/components/sheet";

function Demo() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Narrowing</DialogTitle>
        <DialogDescription>one class narrows</DialogDescription>
        <Input aria-label="Name" />
      </DialogContent>
    </Dialog>
  );
}

function textOf(ids: string | null): (string | null)[] {
  return (ids ?? "")
    .split(" ")
    .filter(Boolean)
    .map((id) => document.getElementById(id)?.textContent ?? null);
}

describe("Dialog", () => {
  it("opens from its trigger and moves focus inside", async () => {
    const user = userEvent.setup();
    render(<Demo />);
    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Demo />);
    const trigger = screen.getByRole("button", { name: "Open" });

    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("has an accessible close control, and it closes", async () => {
    const user = userEvent.setup();
    render(<Demo />);

    await user.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByRole("dialog");
    const close = screen.getByRole("button", { name: "Close" });
    expect(close.tagName).toBe("BUTTON");
    await user.click(close);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("is labelled by its title and described by its description", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Narrowing</DialogTitle>
          <DialogDescription>one class narrows</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog", { name: "Narrowing" });
    expect(textOf(dialog.getAttribute("aria-describedby"))).toEqual(["one class narrows"]);
  });

  it("points aria-describedby at every description when the caller names them", () => {
    render(
      <Dialog open>
        <DialogContent aria-describedby="d1 d2">
          <DialogTitle>Narrowing</DialogTitle>
          <DialogDescription id="d1">one class narrows</DialogDescription>
          <DialogDescription id="d2">nothing becomes invalid</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    const dialog = screen.getByRole("dialog");
    expect(textOf(dialog.getAttribute("aria-describedby"))).toEqual([
      "one class narrows",
      "nothing becomes invalid",
    ]);
  });
});

describe("Sheet", () => {
  function SheetDemo() {
    return (
      <Sheet>
        <SheetTrigger>Filters</SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Narrow the list</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );
  }

  it("opens as a dialog on the requested side, labelled and described", async () => {
    const user = userEvent.setup();
    render(<SheetDemo />);
    await user.click(screen.getByRole("button", { name: "Filters" }));

    const dialog = await screen.findByRole("dialog", { name: "Filters" });
    expect(dialog.getAttribute("data-slot")).toBe("sheet-content");
    expect(dialog.getAttribute("data-side")).toBe("left");
    expect(textOf(dialog.getAttribute("aria-describedby"))).toEqual(["Narrow the list"]);
  });

  it("closes from its close control and on Escape", async () => {
    const user = userEvent.setup();
    render(<SheetDemo />);

    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
