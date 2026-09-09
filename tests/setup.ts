/**
 * The jsdom harness every unit test runs under. Three things, each held by a
 * test or a component in this repository; a workaround nothing here needs does
 * not belong in this file.
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
