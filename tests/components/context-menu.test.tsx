/**
 * ContextMenu, on the behaviour a screen would silently lose.
 *
 * The one this file exists for is DropdownMenu's: **a menu leaves on the frame
 * it is dismissed.** While an exit animation runs, Radix keeps the closed
 * surface mounted and its dismissable layer holds `pointer-events: none` on the
 * body, so the right-click meant to open the next menu is swallowed. jsdom runs
 * no animation and would hide that defect — except that Radix's `Presence`
 * decides whether to wait by reading `animation-name` off `getComputedStyle`,
 * and jsdom resolves that from a `<style>` sheet. The sheet below therefore
 * gives a real animation to any surface that still carries an exit-animation
 * utility, which is exactly what Tailwind would compile, and the first test
 * proves the fixture bites on this very component before the rest rely on its
 * absence.
 */

import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../../src/components/context-menu";

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

/** Radix opens a context menu from the event a right-click produces. */
function rightClick(element: HTMLElement): void {
  fireEvent.contextMenu(element, { button: 2 });
}

function TwoAreas(): JSX.Element {
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>First area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>One</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Nested</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
      <ContextMenu>
        <ContextMenuTrigger>Second area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Two</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}

it("the harness models an exit animation: a surface that carries one stays mounted", async () => {
  const user = userEvent.setup();
  render(
    <ContextMenu>
      <ContextMenuTrigger>Lingering area</ContextMenuTrigger>
      {/* The utility the component deliberately does not carry, put back by the
          call site, so the fixture is shown to bite before its absence is read
          as a passing test. */}
      <ContextMenuContent className="data-closed:animate-out">
        <ContextMenuItem>One</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>,
  );
  rightClick(screen.getByText("Lingering area"));
  await screen.findByRole("menu");
  await user.keyboard("{Escape}");
  const content = document.querySelector("[data-slot=context-menu-content]");
  expect(content?.getAttribute("data-state")).toBe("closed");
});

describe("ContextMenu", () => {
  it("leaves on the frame it is dismissed, so the right-click that opens the next menu lands", async () => {
    const user = userEvent.setup();
    render(<TwoAreas />);

    rightClick(screen.getByText("First area"));
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();

    rightClick(screen.getByText("Second area"));
    const menu = await screen.findByRole("menu");
    expect(within(menu).getByRole("menuitem", { name: "Two" })).toBeTruthy();
  });

  it("closing a submenu leaves no surface behind", async () => {
    const user = userEvent.setup();
    render(<TwoAreas />);

    rightClick(screen.getByText("First area"));
    await screen.findByRole("menu");
    await user.keyboard("{ArrowDown}{ArrowDown}");
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "More" }));

    await user.keyboard("{ArrowRight}");
    expect(await screen.findAllByRole("menu")).toHaveLength(2);
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "Nested" }));

    await user.keyboard("{ArrowLeft}");
    await waitFor(() => expect(screen.getAllByRole("menu")).toHaveLength(1));
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "More" }));
  });

  it("moves through its items with the keyboard", async () => {
    const user = userEvent.setup();
    render(<TwoAreas />);

    rightClick(screen.getByText("First area"));
    await screen.findByRole("menu");
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "One" }));
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(screen.getByRole("menuitem", { name: "More" }));
  });

  it("runs an item's action and closes on the way out", async () => {
    const user = userEvent.setup();
    let chosen = "";
    render(
      <ContextMenu>
        <ContextMenuTrigger>Row</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            onSelect={() => {
              chosen = "delete";
            }}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    rightClick(screen.getByText("Row"));
    await user.click(await screen.findByRole("menuitem", { name: "Delete" }));
    expect(chosen).toBe("delete");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
  });
});
