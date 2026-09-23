/**
 * DropdownMenu, on the behaviour a screen would silently lose.
 *
 * The one this file exists for: **a menu leaves on the frame it is dismissed.**
 * While an exit animation runs, Radix keeps the closed surface mounted and its
 * dismissable layer holds `pointer-events: none` on the body, so the press
 * meant to open the next menu is swallowed. jsdom runs no animation and would
 * hide that defect — except that Radix's `Presence` decides whether to wait by
 * reading `animation-name` off `getComputedStyle`, and jsdom resolves that from
 * a `<style>` sheet. The sheet below therefore gives a real animation to any
 * surface that still carries an exit-animation utility, which is exactly what
 * Tailwind would compile, and the Dialog test proves the fixture bites before
 * the menu tests rely on its absence.
 */

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Button } from "../../src/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../src/components/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../src/components/dropdown-menu";

// What Tailwind compiles `data-closed:animate-out` to — the shadcn variant
// narrowed to the Radix spelling these surfaces emit — reduced to the one
// declaration Radix reads.
const EXIT_ANIMATIONS = `
  [data-state="closed"][class*="data-closed:animate-out"] {
    animation-name: exit;
    animation-duration: 150ms;
  }
`;

/**
 * In a browser `getComputedStyle` returns a live object: Radix reads it once
 * when a surface mounts and again when the state flips, and sees the exit rule
 * appear. jsdom returns a snapshot, so the second read would still say `none`
 * and the rule above would be invisible. This proxy re-resolves on every
 * property access, which is the browser's semantics and nothing more.
 */
const frozenGetComputedStyle = window.getComputedStyle.bind(window);
function liveGetComputedStyle(element: Element, pseudo?: string | null): CSSStyleDeclaration {
  return new Proxy(frozenGetComputedStyle(element, pseudo), {
    get(_target, property) {
      const fresh = frozenGetComputedStyle(element, pseudo);
      const value = Reflect.get(fresh, property);
      return typeof value === "function" ? value.bind(fresh) : value;
    },
  });
}

let sheet: HTMLStyleElement;
beforeAll(() => {
  window.getComputedStyle = liveGetComputedStyle;
  sheet = document.createElement("style");
  sheet.textContent = EXIT_ANIMATIONS;
  document.head.append(sheet);
});
afterAll(() => {
  sheet.remove();
  window.getComputedStyle = frozenGetComputedStyle;
});

it("the harness models an exit animation: a Dialog stays mounted until animationend", async () => {
  const user = userEvent.setup();
  render(
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Still here</DialogTitle>
      </DialogContent>
    </Dialog>,
  );
  await user.click(screen.getByRole("button", { name: "Open" }));
  await screen.findByRole("dialog");
  await user.keyboard("{Escape}");
  const content = document.querySelector("[data-slot=dialog-content]");
  expect(content?.getAttribute("data-state")).toBe("closed");
});

function TwoMenus() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>First</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>One</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Nested</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger>Second</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Two</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

describe("DropdownMenu", () => {
  it("leaves on the frame it is dismissed, so the press that opens the next menu lands", async () => {
    const user = userEvent.setup();
    render(<TwoMenus />);

    await user.click(screen.getByRole("button", { name: "First" }));
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Second" }));
    const menu = await screen.findByRole("menu");
    expect(within(menu).getByRole("menuitem", { name: "Two" })).toBeTruthy();
  });

  it("closing a submenu leaves no surface behind", async () => {
    const user = userEvent.setup();
    render(<TwoMenus />);

    await user.click(screen.getByRole("button", { name: "First" }));
    await screen.findByRole("menu");
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "More" }));

    await user.keyboard("{ArrowRight}");
    expect(await screen.findAllByRole("menu")).toHaveLength(2);
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Nested" }));

    await user.keyboard("{ArrowLeft}");
    expect(screen.getAllByRole("menu")).toHaveLength(1);
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "More" }));
  });

  it("moves through its items with the keyboard and hands focus back on Escape", async () => {
    const user = userEvent.setup();
    render(<TwoMenus />);
    const trigger = screen.getByRole("button", { name: "First" });

    await user.click(trigger);
    await screen.findByRole("menu");
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "One" }));
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "More" }));

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("sizes its surface to the items, not to the trigger", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Actions" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Check integrity of this connection</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Actions" }));
    const classes = (await screen.findByRole("menu")).className.split(" ");
    // Behind an icon-sized trigger, pinning to the trigger width would be a
    // 128px ceiling that wraps every longer item; the floor keeps a one-word
    // menu from collapsing.
    expect(classes).toContain("w-auto");
    expect(classes).toContain("min-w-32");
    expect(classes).not.toContain("w-(--radix-dropdown-menu-trigger-width)");
  });

  /**
   * "All of them" and "some of them" are different answers, and a checkbox item used
   * to give them the same tick. Radix told a screen reader apart all along through
   * `aria-checked="mixed"`; this is the half a sighted reader was missing.
   *
   * jsdom runs no Tailwind, so which glyph actually *shows* is not observable here —
   * that part is confirmed by the preview capture. What is asserted is the thing that
   * was genuinely absent: a second glyph at all, and the state it is keyed on.
   */
  it("gives a partly-selected item its own mark, not the one that means all of it", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Visible classes</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked>Vehicle</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked="indeterminate">Cyclist</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Visible classes" }));
    const [all, some] = await screen.findAllByRole("menuitemcheckbox");

    expect(all.getAttribute("aria-checked")).toBe("true");
    expect(some.getAttribute("aria-checked")).toBe("mixed");

    const glyphs = (item: HTMLElement) =>
      [...item.querySelectorAll("svg")].map(
        (svg) => /lucide-([a-z-]+)/.exec(svg.getAttribute("class") ?? "")?.[1],
      );
    expect(glyphs(some)).toEqual(["check", "minus"]);

    const state = (item: HTMLElement) =>
      item
        .querySelector("[data-slot=dropdown-menu-checkbox-item-indicator] [data-state]")
        ?.getAttribute("data-state");
    expect(state(all)).toBe("checked");
    expect(state(some)).toBe("indeterminate");
  });
});
