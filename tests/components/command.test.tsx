/**
 * Command, on the behaviour a screen would silently lose.
 *
 * A palette is a listbox a reader drives from a text field they never leave, so
 * what is asserted is the wiring that makes that true: typing narrows the list,
 * the arrow keys move a selection that focus does not follow, Enter runs the
 * selected item, and an empty result says so out loud rather than showing a
 * blank box.
 *
 * `CommandDialog` gets its own claim, and it is the one the registry's version
 * got wrong: a dialog's accessible name has to live *inside* the dialog. The
 * title is visually hidden, which is not the same as absent.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react";
import { describe, expect, it } from "vitest";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../src/components/command";

function palette(onSelect: (value: string) => void = () => undefined): JSX.Element {
  return (
    <Command>
      <CommandInput placeholder="Search a command" />
      <CommandList>
        <CommandEmpty>Nothing matches.</CommandEmpty>
        <CommandGroup heading="Ingest">
          <CommandItem value="upload" onSelect={onSelect}>
            Upload a batch
            <CommandShortcut>⌘U</CommandShortcut>
          </CommandItem>
          <CommandItem value="import" onSelect={onSelect}>
            Import from URL
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Schema">
          <CommandItem value="classes" onSelect={onSelect}>
            Edit classes
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

describe("Command", () => {
  it("narrows the list as the reader types, and keeps the field focused", async () => {
    const user = userEvent.setup();
    render(palette());

    const field = screen.getByPlaceholderText("Search a command");
    await user.click(field);
    await user.keyboard("class");

    expect(document.activeElement).toBe(field);
    const options = screen.getAllByRole("option");
    expect(options.map((option) => option.textContent)).toEqual(["Edit classes"]);
  });

  it("says so when nothing matches, instead of showing an empty box", async () => {
    const user = userEvent.setup();
    render(palette());

    await user.click(screen.getByPlaceholderText("Search a command"));
    await user.keyboard("zzz");

    expect(screen.queryAllByRole("option")).toHaveLength(0);
    expect(screen.getByText("Nothing matches.")).toBeTruthy();
  });

  it("moves a selection with the arrow keys that focus does not follow", async () => {
    const user = userEvent.setup();
    render(palette());

    const field = screen.getByPlaceholderText("Search a command");
    await user.click(field);
    const selected = () =>
      screen.getAllByRole("option").find((option) => option.dataset.selected === "true");

    expect(selected()?.textContent).toContain("Upload a batch");
    await user.keyboard("{ArrowDown}");
    expect(selected()?.textContent).toContain("Import from URL");
    // The reader never leaves the field, which is the whole point of a palette.
    expect(document.activeElement).toBe(field);
  });

  it("runs the selected item on Enter", async () => {
    const user = userEvent.setup();
    let ran = "";
    render(palette((value) => (ran = value)));

    await user.click(screen.getByPlaceholderText("Search a command"));
    await user.keyboard("{ArrowDown}{Enter}");
    expect(ran).toBe("import");
  });

  it("groups its items under a heading, because a flat list of verbs is not a palette", () => {
    render(palette());
    const groups = [...document.querySelectorAll<HTMLElement>("[data-slot=command-group]")];
    expect(groups).toHaveLength(2);
    const headings = groups.map(
      (group) => group.querySelector("[cmdk-group-heading]")?.textContent,
    );
    expect(headings).toEqual(["Ingest", "Schema"]);
    expect(within(groups[0]!).getByRole("option", { name: /Upload a batch/ })).toBeTruthy();
    expect(within(groups[1]!).getByRole("option", { name: "Edit classes" })).toBeTruthy();
  });
});

describe("CommandDialog", () => {
  it("is named by a title that lives inside the dialog, hidden rather than absent", async () => {
    render(
      <CommandDialog open title="Command palette" description="Run something.">
        <Command>
          <CommandInput placeholder="Search a command" />
          <CommandList>
            <CommandItem value="upload">Upload a batch</CommandItem>
          </CommandList>
        </Command>
      </CommandDialog>,
    );

    const dialog = await screen.findByRole("dialog", { name: "Command palette" });
    // Rendered as a sibling of the content it names, the heading would sit in
    // the page whether the palette is open or not, and would not be inside the
    // surface Radix labels.
    expect(within(dialog).getByText("Command palette")).toBeTruthy();
    expect(within(dialog).getByText("Run something.")).toBeTruthy();
    expect(dialog.querySelector("[data-slot=dialog-header]")?.className).toContain("sr-only");
  });
});
