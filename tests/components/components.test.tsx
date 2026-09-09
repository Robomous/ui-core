/**
 * The smaller components, on the behaviour a screen would silently lose.
 *
 * Deliberately not an echo of every class string: pinning the design system to
 * whatever it looked like on the day is the mistake a restyle would pay for.
 * What is asserted is roles, `aria-*`, the `data-*` a consumer styles against,
 * and the handful of layout facts a caller depends on. Button, Dialog, Field
 * and DropdownMenu have their own files.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "../../src/components/alert";
import { Badge } from "../../src/components/badge";
import { Card, CardTitle } from "../../src/components/card";
import { Progress } from "../../src/components/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/select";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../src/components/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/tabs";

describe("Alert and Badge", () => {
  it("announces an alert, and composes its title and description", () => {
    render(
      <Alert variant="destructive">
        <AlertTitle>Refused</AlertTitle>
        <AlertDescription>because</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toContain("Refused");
    expect(alert.textContent).toContain("because");
  });

  it("marks a badge with its variant, so a style can be keyed on data rather than colour", () => {
    render(<Badge variant="success">done</Badge>);
    expect(screen.getByText("done").getAttribute("data-variant")).toBe("success");
    expect(screen.getByText("done").getAttribute("data-slot")).toBe("badge");
  });

  it.each(["success", "warning", "info", "quiet"] as const)(
    "%s is a soft surface on a semantic role, never a coloured stroke",
    (variant) => {
      render(<Badge variant={variant}>x</Badge>);
      const el = screen.getByText("x");
      expect(el.getAttribute("data-variant")).toBe(variant);
      expect(el.className).toContain("border-transparent");
      expect(el.className).toMatch(/\bbg-(success|warning|info)\/10\b|\bbg-muted\b/);
      expect(el.className).not.toMatch(/emerald|amber|sky|border-(success|warning|info)/);
    },
  );
});

/**
 * The two-line option — a `multiline` prop on the trigger rather than a class
 * string composed at the call site. The claim worth a test is the one that is
 * easy to lose: the trigger shows the *same* two lines the list does, because
 * Radix renders the selected item's own children into it.
 */
describe("Select", () => {
  function pickOne(): JSX.Element {
    return (
      <Select defaultValue="a">
        <SelectTrigger data-testid="model" multiline>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">
            <span className="flex flex-col items-start">
              <span>org/model-tiny</span>
              <span className="text-xs text-muted-foreground">311.9 MB · tiny</span>
            </span>
          </SelectItem>
          <SelectItem value="b">org/model-large</SelectItem>
        </SelectContent>
      </Select>
    );
  }

  it("stacks the identifier and its meta in the closed trigger", () => {
    render(pickOne());
    const trigger = screen.getByTestId("model");
    expect(trigger.textContent).toContain("org/model-tiny");
    expect(trigger.textContent).toContain("311.9 MB · tiny");
    const meta = trigger.querySelector(".text-muted-foreground");
    expect(meta?.textContent).toBe("311.9 MB · tiny");
  });

  it("grows rather than clipping when multiline, and clamps otherwise", () => {
    render(pickOne());
    const trigger = screen.getByTestId("model");
    // `min-h-8` keeps a one-line control at the usual height and lets a
    // two-line one grow; the merge has to *replace* the fixed height and the
    // value clamp rather than stack beside them.
    expect(trigger.className).toContain("min-h-8");
    expect(trigger.className).toContain("line-clamp-none");
    expect(trigger.className).not.toContain("data-[size=default]:h-8");
    expect(trigger.className).not.toContain("line-clamp-1");
  });

  it("opens to a listbox floored at the closed control's width", async () => {
    render(pickOne());
    await userEvent.click(screen.getByTestId("model"));
    expect(await screen.findByRole("listbox")).toBeTruthy();
    const viewport = document.querySelector("[data-radix-select-viewport]") as HTMLElement;
    expect(viewport.className).toContain("min-w-(--radix-select-trigger-width)");
  });
});

describe("Card and Table", () => {
  it("marks a card title with its slot, for the styling that reads it", () => {
    render(
      <Card>
        <CardTitle>Classes</CardTitle>
      </Card>,
    );
    expect(screen.getByText("Classes").getAttribute("data-slot")).toBe("card-title");
  });

  it("keeps the table's header while the body is empty", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>State</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody />
      </Table>,
    );
    expect(screen.getByRole("columnheader", { name: "Name" })).not.toBeNull();
    expect(screen.getByRole("columnheader", { name: "State" })).not.toBeNull();
  });
});

/**
 * The tab bar, asserted on what it means rather than what it looks like: the
 * roles, `aria-selected`, Radix's `data-state`, and that only the open panel is
 * in the tree at all.
 */
describe("Tabs", () => {
  function bar(): JSX.Element {
    return (
      <Tabs defaultValue="schema">
        <TabsList aria-label="Sections">
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
        </TabsList>
        <TabsContent value="schema">the classes</TabsContent>
        <TabsContent value="batches">the batches</TabsContent>
      </Tabs>
    );
  }

  it("marks the open section as the selected tab and the others as not", () => {
    render(bar());
    const [schema, batches] = screen.getAllByRole("tab");
    expect(schema.getAttribute("aria-selected")).toBe("true");
    expect(schema.dataset.state).toBe("active");
    expect(batches.getAttribute("aria-selected")).toBe("false");
    expect(batches.dataset.state).toBe("inactive");
  });

  it("moves the selection when a tab is clicked", async () => {
    render(bar());
    await userEvent.click(screen.getByRole("tab", { name: "Batches" }));
    expect(screen.getByRole("tab", { name: "Batches" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tab", { name: "Schema" }).getAttribute("aria-selected")).toBe("false");
  });

  it("keeps only the open panel in the tree, and labels the list", () => {
    render(bar());
    const panels = screen.getAllByRole("tabpanel");
    expect(panels).toHaveLength(1);
    expect(panels[0]?.textContent).toBe("the classes");
    expect(screen.getByRole("tablist").getAttribute("aria-label")).toBe("Sections");
  });

  it("is operable from the keyboard: one tab stop, arrows move within it", async () => {
    render(bar());
    await userEvent.tab();
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Schema" }));
    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Batches" }));
    expect(screen.getByRole("tab", { name: "Batches" }).getAttribute("aria-selected")).toBe("true");
  });
});

describe("Progress", () => {
  it("reports its value to assistive technology without help from the caller", () => {
    render(<Progress value={42} aria-label="Ingest" />);
    const bar = screen.getByRole("progressbar", { name: "Ingest" });
    expect(bar.getAttribute("aria-valuenow")).toBe("42");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    expect(bar.getAttribute("data-state")).not.toBe("indeterminate");
  });

  it("fills with the functional colour and carries a data-slot a caller can restyle from", () => {
    // No `variant`, no notion of status: completion is an amount, not a polarity.
    render(<Progress value={42} aria-label="Ingest" />);
    const fill = screen.getByRole("progressbar").firstElementChild as HTMLElement;
    expect(fill.getAttribute("data-slot")).toBe("progress-indicator");
    expect(fill.className).toContain("bg-primary");
    expect(fill.style.transform).toBe("translateX(-58%)");
  });

  it("hands its ref to the track element", () => {
    let track: HTMLDivElement | null = null;
    render(
      <Progress
        value={7}
        aria-label="Ingest"
        ref={(node) => {
          track = node;
        }}
      />,
    );
    expect(track).toBe(screen.getByRole("progressbar"));
  });
});
