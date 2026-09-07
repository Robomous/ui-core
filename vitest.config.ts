/**
 * The component-test harness.
 *
 * These are ordinary DOM components whose behaviour *is* markup and roles —
 * the `className` merge that makes an override real, the `asChild` that keeps a
 * link a link, the value a `Progress` announces — so jsdom is the environment
 * that can see any of it. The gates run here too, under
 * `// @vitest-environment node`, because they read files rather than render
 * anything. One suite, one command.
 */

import { availableParallelism } from "node:os";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * How many test files run at once, and why it is a quarter of the cores rather
 * than vitest's own default.
 *
 * Vitest's `forks` pool defaults to roughly one worker per logical core, and a
 * worker here is not cheap: each one stands up a whole jsdom and a React root
 * before it asserts anything. At one per core the suite oversubscribes the
 * machine it is running on, and the tests that then miss their deadline are not
 * the slow ones — they are whichever happened to be holding a core when the
 * machine ran out, which is a failure that moves between runs and reads as
 * flakiness rather than as load.
 *
 * Derived rather than fixed, because this is the command a contributor runs on
 * whatever they have: a number chosen for a twenty-core desktop would throttle a
 * four-core laptop. The divisor is four rather than two because the count that
 * held was half the *physical* cores on a hyperthreaded box, and
 * `availableParallelism` reports logical ones. The floor of two keeps a two-core
 * CI runner where it already is — GitHub's runners derive below the floor, so the
 * cap changes nothing there.
 *
 * The cap costs close to nothing, which is worth stating because it sounds like it
 * should not be. A suite's wall time is bounded by its slowest *file*, not by how
 * much CPU it can occupy, so workers past the point where each one carries less
 * work than the critical path spend most of their lives waiting for it. What the
 * cap removes is the contention that made every *other* file miss a deadline.
 */
const MAX_WORKERS = Math.max(2, Math.floor(availableParallelism() / 4));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    // Every suite, including the gates' own tests, lives under src/.
    include: ["src/**/*.test.{ts,tsx}"],
    // Explicit imports from "vitest" in every test file. Globals would make a
    // test file's dependencies invisible.
    globals: false,
    setupFiles: ["./vitest.setup.ts"],
    maxWorkers: MAX_WORKERS,
    /**
     * Headroom, not a loosening.
     *
     * Vitest's 5000ms default is a bound for a pure function. A test here mounts
     * a component into jsdom and drives it through `userEvent`, which waits on
     * real timers between synthetic events, and the gates shell out to
     * `git ls-files` and read every tracked source. Neither is slow, but neither
     * is bounded the way a pure function is, and a deadline tuned for the fast
     * case turns a loaded machine into a red suite.
     *
     * It works only alongside the cap above. On its own a bigger timeout would
     * just move the load at which contention starts reading as failure.
     */
    testTimeout: 15_000,
  },
});
