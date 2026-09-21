/**
 * Popover and HoverCard — the two floating surfaces that are neither a menu nor
 * a dialog — on the behaviour a screen would silently lose.
 *
 * The claim this file exists for is the one DropdownMenu made first, extended
 * to the surface with the same failure mode: **a popover leaves on the frame it
 * is dismissed.** Its trigger is a button the reader can press again on the
 * next frame, and while an exit animation runs Radix keeps the closed surface
 * mounted and its dismissable layer holds `pointer-events: none` on the body,
 * so that press is swallowed. A HoverCard is the other case and keeps its exit
 * animation: it is dismissed by moving the pointer away, and nothing is waiting
 * on the frame after.
 *
 * jsdom runs no animation, so the fixture below gives a real one to any surface
 * that still carries an exit-animation utility — exactly what Tailwind would
 * compile — and the first test proves it bites before the rest read its absence
 * as a pass.
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { Button } from "../../src/components/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../src/components/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../src/components/popover";

const EXIT_ANIMATIONS = `
  [data-state="closed"][class*="data-closed:animate-out"] {
    animation-name: exit;
    animation-duration: 150ms;
  }
`;

/** Browser semantics for `getComputedStyle`: a live object, not a snapshot. */
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

function TwoPopovers(): JSX.Element {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>First</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Rename</PopoverTitle>
            <PopoverDescription>The name shown in the sidebar.</PopoverDescription>
          </PopoverHeader>
          <Button>Save</Button>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Second</Button>
        </PopoverTrigger>
        <PopoverContent>
          <Button>Confirm</Button>
        </PopoverContent>
      </Popover>
    </>
  );
}

it("the harness models an exit animation: a surface that carries one stays mounted", async () => {
  const user = userEvent.setup();
  render(
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      {/* The utility the component deliberately does not carry, put back by the
          call site, so the fixture is shown to bite before its absence is read
          as a passing test. */}
      <PopoverContent className="data-closed:animate-out">
        <Button>Inside</Button>
      </PopoverContent>
    </Popover>,
  );
  await user.click(screen.getByRole("button", { name: "Open" }));
  await screen.findByRole("dialog");
  await user.keyboard("{Escape}");
  const content = document.querySelector("[data-slot=popover-content]");
  expect(content?.getAttribute("data-state")).toBe("closed");
});

describe("Popover", () => {
  it("leaves on the frame it is dismissed, so the press that opens the next one lands", async () => {
    const user = userEvent.setup();
    render(<TwoPopovers />);

    await user.click(screen.getByRole("button", { name: "First" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Second" }));
    expect(await screen.findByRole("button", { name: "Confirm" })).toBeTruthy();
  });

  it("moves focus into the surface and hands it back on Escape", async () => {
    const user = userEvent.setup();
    render(<TwoPopovers />);
    const trigger = screen.getByRole("button", { name: "First" });

    await user.click(trigger);
    await screen.findByRole("dialog");
    await waitFor(() =>
      expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true),
    );

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(trigger));
  });

  it("tells the trigger's state to assistive technology without help from the caller", async () => {
    const user = userEvent.setup();
    render(<TwoPopovers />);
    const trigger = screen.getByRole("button", { name: "First" });

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    await user.click(trigger);
    await screen.findByRole("dialog");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
  });

  it("composes a header a reader can hear, and marks each part with its slot", async () => {
    const user = userEvent.setup();
    render(<TwoPopovers />);
    await user.click(screen.getByRole("button", { name: "First" }));
    await screen.findByRole("dialog");

    expect(screen.getByText("Rename").getAttribute("data-slot")).toBe("popover-title");
    expect(screen.getByText("The name shown in the sidebar.").getAttribute("data-slot")).toBe(
      "popover-description",
    );
  });
});

describe("HoverCard", () => {
  it("opens on hover and keeps its exit animation, because nothing is waiting on the next frame", async () => {
    const user = userEvent.setup();
    render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger href="#profile">@robomous</HoverCardTrigger>
        <HoverCardContent>Joined in 2026.</HoverCardContent>
      </HoverCard>,
    );

    await user.hover(screen.getByText("@robomous"));
    expect(await screen.findByText("Joined in 2026.")).toBeTruthy();

    const content = document.querySelector("[data-slot=hover-card-content]") as HTMLElement;
    expect(content.className).toContain("data-closed:animate-out");
  });
});
