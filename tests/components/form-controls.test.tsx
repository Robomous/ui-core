/**
 * Checkbox, Switch and Slider: the three controls whose state is only ever an `aria-*` attribute
 * on an element that is not a native input, so a screen reader loses them silently when that
 * attribute stops moving. Tested by role and value, never by class string.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Checkbox } from "../../src/components/checkbox";
import { Label } from "../../src/components/label";
import { Slider } from "../../src/components/slider";
import { Switch } from "../../src/components/switch";

describe("Checkbox", () => {
  it("toggles from its label and from the keyboard, and says so in aria-checked", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept the terms</Label>
      </div>,
    );
    const box = screen.getByRole("checkbox", { name: "Accept the terms" });
    expect(box.getAttribute("aria-checked")).toBe("false");

    await user.click(screen.getByText("Accept the terms"));
    expect(box.getAttribute("aria-checked")).toBe("true");

    box.focus();
    await user.keyboard(" ");
    expect(box.getAttribute("aria-checked")).toBe("false");
  });

  it("reports the indeterminate state as mixed", () => {
    render(<Checkbox aria-label="Select all" checked="indeterminate" />);
    expect(screen.getByRole("checkbox", { name: "Select all" }).getAttribute("aria-checked")).toBe(
      "mixed",
    );
  });

  it("is a button that never submits its form, and still posts its value", async () => {
    const user = userEvent.setup();
    let submitted: FormData | undefined;
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitted = new FormData(event.currentTarget);
        }}
      >
        <Checkbox aria-label="Subscribe" name="subscribe" defaultChecked />
        <button type="submit">Save</button>
      </form>,
    );
    const box = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(box.getAttribute("type")).toBe("button");

    await user.click(box);
    await user.click(box);
    expect(submitted).toBeUndefined();

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(submitted?.get("subscribe")).toBe("on");
  });

  it("cannot be toggled while disabled", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Locked" disabled />);
    const box = screen.getByRole("checkbox", { name: "Locked" });
    await user.click(box);
    expect(box.getAttribute("aria-checked")).toBe("false");
  });
});

describe("Switch", () => {
  it("is a switch, not a pressed button, and flips from pointer and Space", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Auto-save" />);
    const toggle = screen.getByRole("switch", { name: "Auto-save" });
    expect(toggle.getAttribute("aria-checked")).toBe("false");
    expect(toggle.hasAttribute("aria-pressed")).toBe(false);
    expect(toggle.getAttribute("type")).toBe("button");

    await user.click(toggle);
    expect(toggle.getAttribute("aria-checked")).toBe("true");

    await user.keyboard(" ");
    expect(toggle.getAttribute("aria-checked")).toBe("false");
  });

  it("reports each change to the caller", async () => {
    const user = userEvent.setup();
    const changes: boolean[] = [];
    render(<Switch aria-label="Notify" onCheckedChange={(checked) => changes.push(checked)} />);
    await user.click(screen.getByRole("switch", { name: "Notify" }));
    await user.click(screen.getByRole("switch", { name: "Notify" }));
    expect(changes).toEqual([true, false]);
  });
});

describe("Slider", () => {
  it("names the thumb, which is the element announced, and moves it from the keyboard", async () => {
    const user = userEvent.setup();
    render(<Slider aria-label="Confidence" defaultValue={[40]} step={5} />);
    const thumb = screen.getByRole("slider", { name: "Confidence" });
    expect(thumb.getAttribute("aria-valuenow")).toBe("40");
    expect(thumb.getAttribute("aria-valuemin")).toBe("0");
    expect(thumb.getAttribute("aria-valuemax")).toBe("100");

    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(thumb.getAttribute("aria-valuenow")).toBe("45");
    await user.keyboard("{End}");
    expect(thumb.getAttribute("aria-valuenow")).toBe("100");
  });

  it("renders one thumb when given no value, as Radix starts at [min]", () => {
    render(<Slider aria-label="Threshold" />);
    const thumbs = screen.getAllByRole("slider");
    expect(thumbs).toHaveLength(1);
    expect(thumbs[0]?.getAttribute("aria-valuenow")).toBe("0");
  });

  it("renders one named thumb per value for a range", () => {
    render(<Slider aria-label="Score range" defaultValue={[20, 80]} />);
    const thumbs = screen.getAllByRole("slider", { name: "Score range" });
    expect(thumbs.map((thumb) => thumb.getAttribute("aria-valuenow"))).toEqual(["20", "80"]);
  });
});
