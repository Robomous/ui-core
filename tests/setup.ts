/**
 * The jsdom harness every unit test runs under. Each piece is held by a test or
 * a component in this repository; a workaround nothing here needs does not
 * belong in this file.
 */

import { cleanup } from "@testing-library/react";
import { toast } from "sonner";
import { afterEach } from "vitest";

/**
 * Unmount between tests, and let the unmount finish.
 *
 * `@testing-library/react` registers `cleanup` itself only when `afterEach` is
 * a global; this suite runs with `globals: false`, so it is registered here.
 *
 * The drained macrotask is for work an unmount schedules rather than does.
 * Radix's focus scope returns focus from a `setTimeout(…, 0)` registered by its
 * unmount cleanup; after a file's last test that timer races vitest's
 * environment teardown and, when teardown wins, dispatches an event into a
 * closed document — an uncaught `TypeError` under a green test count. A timer
 * scheduled here, after Radix's and for the same duration, fires after it.
 * `tests/harness.test.tsx` holds the property.
 */
afterEach(async () => {
  cleanup();
  await new Promise((resolve) => setTimeout(resolve, 0));
});

/**
 * Sonner's toast store is module-global and outlives `cleanup()`, and a freshly
 * mounted `<Toaster />` replays every toast still in it. `dismiss()` with no id
 * marks every active toast dismissed synchronously. `tests/components/sonner.test.tsx`
 * fires a toast in each of its tests and would otherwise see the previous one.
 */
afterEach(() => toast.dismiss());

/**
 * Two DOM methods jsdom does not implement, which Radix's `Select` and
 * `DropdownMenu` call while opening. Without them the open throws inside Radix
 * and the test reads as "the option is not there".
 */
if (typeof Element !== "undefined") {
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.setPointerCapture ??= () => undefined;
  Element.prototype.releasePointerCapture ??= () => undefined;
  Element.prototype.scrollIntoView ??= () => undefined;
}

/**
 * `window.matchMedia`, which jsdom does not implement and `useIsMobile` calls
 * from an effect while the Sidebar mounts. `matches` answers a `max-width`
 * query from `window.innerWidth`, so `tests/components/sidebar.test.tsx` puts
 * the viewport under the breakpoint by assigning `innerWidth` before it renders.
 */
if (typeof window !== "undefined") {
  window.matchMedia ??= (query: string): MediaQueryList => {
    const maxWidth = Number(/max-width:\s*(\d+)px/.exec(query)?.[1] ?? Infinity);
    return {
      media: query,
      matches: window.innerWidth <= maxWidth,
      onchange: null,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      addListener: () => undefined,
      removeListener: () => undefined,
      dispatchEvent: () => false,
    };
  };
}

/**
 * `ResizeObserver`, which jsdom does not implement and which cmdk constructs
 * while `Command` mounts — it measures the list to keep the selected item in
 * view. Nothing here observes anything, because no test asserts on a resize;
 * the constructor existing is the whole requirement.
 * `tests/components/command.test.tsx` needs it.
 */
if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  };
}
