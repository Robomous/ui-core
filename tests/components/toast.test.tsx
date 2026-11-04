import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { toast } from "sonner";
import { Toaster } from "../../src/components/toast";

afterEach(() => document.documentElement.classList.remove("dark"));

// sonner only mounts `[data-sonner-toaster]` once a toast exists (it maps
// over `filteredToasts` and returns `null` for every position while that
// list is empty), and the theme it stamps on that element lands in
// `data-sonner-theme`, not `data-theme`. A toast is fired here to bring the
// element into being; `waitFor` covers the render sonner does outside this
// call stack when it flushes the toast through its module-global store.
describe("typed toasts", () => {
  it("keep a neutral surface and carry their status in the icon", async () => {
    const { container } = render(<Toaster />);
    toast.success("Saved");
    await waitFor(() => {
      expect(container.querySelector('[data-type="success"]')).not.toBeNull();
    });
    const toastEl = container.querySelector('[data-type="success"]');
    expect(toastEl?.getAttribute("data-rich-colors")).not.toBe("true");
    expect(toastEl?.querySelector("[data-icon] svg")?.getAttribute("class")).toContain(
      "text-success",
    );
    const toaster = container.querySelector<HTMLElement>("[data-sonner-toaster]");
    expect(toaster?.style.getPropertyValue("--normal-bg")).toBe(
      "color-mix(in oklch, var(--muted) 50%, var(--popover))",
    );
  });

  it("give each status its own mark", async () => {
    const { container } = render(<Toaster />);
    toast.error("Failed");
    toast.warning("Almost full");
    toast.info("Queued");
    await waitFor(() => {
      expect(container.querySelector('[data-type="info"]')).not.toBeNull();
    });
    for (const [type, ink] of [
      ["error", "text-destructive"],
      ["warning", "text-warning"],
      ["info", "text-info"],
    ]) {
      expect(
        container.querySelector(`[data-type="${type}"] [data-icon] svg`)?.getAttribute("class"),
      ).toContain(ink);
    }
  });
});

describe("close button", () => {
  it("shows on a toast with no cancel button", async () => {
    const { container } = render(<Toaster />);
    toast("Queued", { action: { label: "Undo", onClick: () => {} } });
    await waitFor(() => {
      expect(container.querySelector("[data-close-button]")).not.toBeNull();
    });
  });
});

describe("toaster theme", () => {
  it("is light when <html> carries no class", async () => {
    const { container } = render(<Toaster />);
    toast("hi");
    await waitFor(() => {
      expect(
        container.querySelector("[data-sonner-toaster]")?.getAttribute("data-sonner-theme"),
      ).toBe("light");
    });
  });
  it("is dark when <html> carries .dark", async () => {
    document.documentElement.classList.add("dark");
    const { container } = render(<Toaster />);
    toast("hi");
    await waitFor(() => {
      expect(
        container.querySelector("[data-sonner-toaster]")?.getAttribute("data-sonner-theme"),
      ).toBe("dark");
    });
  });
  it("follows <html> from light to dark after mount, via the MutationObserver", async () => {
    const { container } = render(<Toaster />);
    toast("hi");
    await waitFor(() => {
      expect(
        container.querySelector("[data-sonner-toaster]")?.getAttribute("data-sonner-theme"),
      ).toBe("light");
    });
    document.documentElement.classList.add("dark");
    await waitFor(() => {
      expect(
        container.querySelector("[data-sonner-toaster]")?.getAttribute("data-sonner-theme"),
      ).toBe("dark");
    });
  });
});
