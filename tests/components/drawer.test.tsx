/**
 * Drawer, on the behaviour a screen would silently lose.
 *
 * The only component here whose behaviour comes from vaul rather than Radix or
 * Base UI, which is the reason it gets its own file: it has to make the same
 * promises a Dialog and a Sheet make, through a different library. A surface
 * the reader has to dismiss before they can do anything else is named by its
 * title, described by its description, leaves on Escape, and hands focus back.
 *
 * It keeps its exit animation, for the reason a Dialog does: its trigger is not
 * something the reader presses again on the next frame. See DESIGN.md, *Motion*.
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react";
import { describe, expect, it } from "vitest";

import { Button } from "../../src/components/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../src/components/drawer";

function sheet(): JSX.Element {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Filters</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>Narrow the batches shown.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("is named by its title and described by its description, through the library's own ids", async () => {
    const user = userEvent.setup();
    render(sheet());

    await user.click(screen.getByRole("button", { name: "Filters" }));
    const dialog = await screen.findByRole("dialog");

    expect(dialog.getAttribute("aria-labelledby")).toBe(
      screen.getByText("Filters", { selector: "[data-slot=drawer-title]" }).id,
    );
    expect(dialog.getAttribute("aria-describedby")).toBe(
      screen.getByText("Narrow the batches shown.").id,
    );
  });

  it("closes on Escape and hands focus back to the trigger", async () => {
    const user = userEvent.setup();
    render(sheet());
    const trigger = screen.getByRole("button", { name: "Filters" });

    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("closes from its own close control", async () => {
    const user = userEvent.setup();
    render(sheet());

    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("paints a scrim on the overlay role, never on a palette colour", async () => {
    const user = userEvent.setup();
    render(sheet());

    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByRole("dialog");

    const overlay = document.querySelector("[data-slot=drawer-overlay]") as HTMLElement;
    // `black` produces nothing: the colour namespace is closed. `overlay` is
    // the role, and its value is the scrim both themes want.
    expect(overlay.className).toContain("bg-overlay");
    expect(overlay.className).not.toMatch(/bg-(black|white|neutral|zinc)/);
  });
});
