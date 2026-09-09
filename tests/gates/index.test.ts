// @vitest-environment node
import { execFileSync } from "node:child_process";
import { expect, test } from "vitest";

test("foundationTokenNames resolves the stylesheet from the built package", () => {
  const script = `import("./dist/gates/index.js").then((m) => { const n = m.foundationTokenNames(); if (!n.includes("background")) { throw new Error("missing token: " + n.join(",")); } console.log("ok"); });`;
  const out = execFileSync(process.execPath, ["--input-type=module", "-e", script], {
    encoding: "utf8",
  });
  expect(out.trim()).toBe("ok");
});
