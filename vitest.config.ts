/**
 * Two projects, one command each.
 *
 * `unit` renders the components into jsdom and asserts the behaviour a screen
 * would silently lose. `package` builds and packs this repository, installs the
 * tarball into a throwaway consumer and compiles it with a real Tailwind — the
 * only check here that sees the package the way a consumer does. It is slow and
 * touches the network, so `pnpm test` runs `unit` alone and `pnpm test:package`
 * runs the other.
 */

import { availableParallelism } from "node:os";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * A quarter of the logical cores, floor two. Each worker stands up a jsdom and
 * a React root; one per core oversubscribes the machine and the tests that then
 * miss their deadline are whichever happened to hold a core, which reads as
 * flakiness rather than as load. A suite's wall time is bounded by its slowest
 * file, so the cap costs close to nothing.
 */
const MAX_WORKERS = Math.max(2, Math.floor(availableParallelism() / 4));

export default defineConfig({
  test: {
    // Explicit imports from "vitest" in every test file: globals would make a
    // test file's dependencies invisible.
    globals: false,
    maxWorkers: MAX_WORKERS,
    projects: [
      {
        plugins: [react()],
        test: {
          name: "unit",
          environment: "jsdom",
          include: ["tests/**/*.test.{ts,tsx}"],
          exclude: ["tests/package/**"],
          setupFiles: ["./tests/setup.ts"],
          // Headroom for userEvent, which waits on real timers between events.
          testTimeout: 15_000,
        },
      },
      {
        test: {
          name: "package",
          environment: "node",
          include: ["tests/package/**/*.test.ts"],
          testTimeout: 600_000,
          hookTimeout: 600_000,
        },
      },
    ],
  },
});
