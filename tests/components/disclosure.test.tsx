/**
 * Accordion and Collapsible: a disclosure is a button whose `aria-expanded` has to agree with
 * whether its region is actually in the page. Tested by that agreement and by the keyboard, never
 * by class string.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../src/components/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../src/components/collapsible";

describe("Accordion", () => {
  function accordion(): JSX.Element {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="general">
          <AccordionTrigger>General</AccordionTrigger>
          <AccordionContent>Project name and description.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="labels">
          <AccordionTrigger>Labels</AccordionTrigger>
          <AccordionContent>Classes and their colours.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="export">
          <AccordionTrigger>Export</AccordionTrigger>
          <AccordionContent>Formats and splits.</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  it("renders each trigger as a button inside a heading, collapsed", () => {
    render(accordion());
    const trigger = screen.getByRole("button", { name: "General" });
    expect(trigger.getAttribute("type")).toBe("button");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.closest("h3")).not.toBeNull();
    expect(screen.queryByText("Project name and description.")).toBeNull();
  });

  it("opens one region at a time, labelled by its trigger, and can close it again", async () => {
    const user = userEvent.setup();
    render(accordion());
    const general = screen.getByRole("button", { name: "General" });
    const labels = screen.getByRole("button", { name: "Labels" });

    await user.click(general);
    expect(general.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("region", { name: "General" }).textContent).toContain(
      "Project name and description.",
    );

    await user.click(labels);
    expect(labels.getAttribute("aria-expanded")).toBe("true");
    expect(general.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Project name and description.")).toBeNull();

    await user.click(labels);
    expect(labels.getAttribute("aria-expanded")).toBe("false");
  });

  it("moves between triggers with the arrow keys, Home and End", async () => {
    const user = userEvent.setup();
    render(accordion());
    screen.getByRole("button", { name: "General" }).focus();

    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Labels" }));
    await user.keyboard("{End}");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "Export" }));
    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "General" }));

    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "General" }).getAttribute("aria-expanded")).toBe(
      "true",
    );
  });
});

describe("Collapsible", () => {
  it("ties its trigger to its content and toggles the content in and out of the page", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Advanced filters</CollapsibleTrigger>
        <CollapsibleContent>Only unlabelled assets</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Advanced filters" });
    expect(trigger.getAttribute("type")).toBe("button");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Only unlabelled assets")).toBeNull();

    await user.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    const content = screen.getByText("Only unlabelled assets");
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);

    await user.keyboard("{Enter}");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Only unlabelled assets")).toBeNull();
  });
});
