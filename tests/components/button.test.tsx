import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FormEvent } from "react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../../src/components/button";

describe("Button", () => {
  it("defaults a native button to type=button, so it cannot submit a form by accident", async () => {
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button>Cancel</Button>
      </form>,
    );
    const button = screen.getByRole("button", { name: "Cancel" });
    expect(button.getAttribute("type")).toBe("button");
    await userEvent.click(button);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits when asked to", async () => {
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit">Save</Button>
      </form>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.getAttribute("type")).toBe("submit");
    await userEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders the child element with asChild, and forces no type onto it", () => {
    render(
      <Button asChild>
        <a href="/projects">Projects</a>
      </Button>,
    );
    // A `role="link"` on a `<button>` would read the same to a test and behave
    // differently to a browser — no middle-click, no "open in new tab".
    const link = screen.getByRole("link", { name: "Projects" });
    expect(link.tagName).toBe("A");
    expect(link.hasAttribute("type")).toBe(false);
    expect(link.className).toContain("bg-primary");
  });

  it("is inert when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Nope" });
    expect(button).toHaveProperty("disabled", true);
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("lets a caller's className win a conflicting utility rather than emitting both", () => {
    // Without a Tailwind-aware merge both `px-2.5` and `px-6` survive and which
    // one wins is decided by stylesheet order — a rule nobody can see from the
    // call site. This is what makes `className` an extension point.
    render(<Button className="px-6">Wide</Button>);
    const classes = screen.getByRole("button", { name: "Wide" }).className.split(" ");
    expect(classes).toContain("px-6");
    expect(classes).not.toContain("px-2.5");
  });

  it("lets a caller's className outrank a size's own geometry", () => {
    render(
      <Button variant="link" size="inline" className="h-8">
        More
      </Button>,
    );
    const classes = screen.getByRole("button").className.split(" ");
    expect(classes).toContain("h-8");
    expect(classes).not.toContain("h-auto");
  });

  it("marks its variant and size as data, so a parent can style by decision rather than by colour", () => {
    render(
      <Button variant="link" size="inline">
        Read the docs
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Read the docs" });
    expect(button.getAttribute("data-variant")).toBe("link");
    expect(button.getAttribute("data-size")).toBe("inline");
  });
});
