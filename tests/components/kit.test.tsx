import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CodeBlock } from "../../src/components/code-block";
import { DestructiveActionModal } from "../../src/components/destructive-action-modal";
import { DropdownMenuItem } from "../../src/components/dropdown-menu";
import { ErrorMessage } from "../../src/components/error";
import { FilterParamsBar, useFilterParams } from "../../src/components/filter-params";
import { LoadingDots } from "../../src/components/loading-dots";
import { SearchInput } from "../../src/components/search-input";
import { ShowMore, ShowMoreContent, ShowMoreTrigger } from "../../src/components/show-more";
import { Snippet } from "../../src/components/snippet";
import { SplitButton } from "../../src/components/split-button";

/** A clipboard jsdom does not have, recorded. */
function stubClipboard() {
  const writeText = vi.fn(async () => {});
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
  return writeText;
}

afterEach(() => window.history.replaceState(null, "", "/"));

describe("Snippet", () => {
  it("draws the prompt but copies the bare command", async () => {
    const writeText = stubClipboard();
    render(<Snippet text="pnpm add @robomous/ui-core" />);
    expect(screen.getByText("$", { exact: false })).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));
    expect(writeText).toHaveBeenCalledWith("pnpm add @robomous/ui-core");
    expect(screen.getByText("Copied")).toBeTruthy();
  });

  it("joins a multi-line snippet with newlines, and honours copyText", async () => {
    const writeText = stubClipboard();
    const { rerender } = render(<Snippet text={["cd fleet", "make flash"]} />);
    await userEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));
    expect(writeText).toHaveBeenLastCalledWith("cd fleet\nmake flash");
    rerender(<Snippet text="Copy install prompt" prompt={false} copyText="secret" />);
    await userEvent.click(screen.getByRole("button", { name: "Copy to clipboard" }));
    expect(writeText).toHaveBeenLastCalledWith("secret");
  });
});

describe("CodeBlock", () => {
  const code = "const a = 1;\nconst b = 2;\nconst c = 3;";

  it("numbers lines and marks highlighted, added and removed ones", () => {
    const { container } = render(
      <CodeBlock code={code} highlightLines={[1]} addedLines={[3]} removedLines={[2]} />,
    );
    expect(container.querySelectorAll("[data-line]")).toHaveLength(3);
    expect(container.querySelector('[data-line="1"]')?.hasAttribute("data-highlighted")).toBe(true);
    expect(container.querySelector('[data-line="2"]')?.getAttribute("data-diff")).toBe("removed");
    expect(container.querySelector('[data-line="3"]')?.getAttribute("data-diff")).toBe("added");
  });

  it("copies the code without the removed lines, so a pasted diff runs", async () => {
    const writeText = stubClipboard();
    render(<CodeBlock code={code} removedLines={[2]} filename="a.ts" />);
    await userEvent.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith("const a = 1;\nconst c = 3;");
  });

  it("links each line number to its line when referenceable", () => {
    const { container } = render(<CodeBlock id="snip" code={code} referenceable />);
    expect(screen.getByRole("link", { name: "Line 2" }).getAttribute("href")).toBe("#snip-L2");
    expect(container.querySelector("#snip-L2")).not.toBeNull();
  });

  it("switches between variants with tabs", async () => {
    render(
      <CodeBlock
        switcher="tabs"
        variants={[
          { label: "Python", code: "print('hi')", language: "py" },
          { label: "Bash", code: "echo hi", language: "bash" },
        ]}
      />,
    );
    expect(screen.getByText("print")).toBeTruthy();
    await userEvent.click(screen.getByRole("tab", { name: "Bash" }));
    expect(screen.getByRole("tab", { name: "Bash" }).getAttribute("aria-selected")).toBe("true");
    expect(screen.queryByText("print")).toBeNull();
  });
  it("is a tablist: one tab stop, arrow keys select, the code is the labelled panel", async () => {
    const user = userEvent.setup();
    render(
      <CodeBlock
        switcher="tabs"
        variants={[
          { label: "pnpm", code: "pnpm add x" },
          { label: "npm", code: "npm i x" },
          { label: "yarn", code: "yarn add x" },
        ]}
      />,
    );
    const [pnpm, npm, yarn] = screen.getAllByRole("tab");
    expect(pnpm!.tabIndex).toBe(0);
    expect(npm!.tabIndex).toBe(-1);
    expect(screen.getByRole("tabpanel", { name: "pnpm" })).toBeTruthy();

    pnpm!.focus();
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(npm);
    expect(npm!.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tabpanel", { name: "npm" }).textContent).toContain("npm i x");

    await user.keyboard("{End}");
    expect(document.activeElement).toBe(yarn);
    await user.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(pnpm);
  });
});

describe("DestructiveActionModal", () => {
  it("keeps submit disabled until the phrase is typed exactly", async () => {
    const onConfirm = vi.fn();
    render(
      <DestructiveActionModal
        defaultOpen
        title="Delete Robot"
        description="rb-07 will be removed from the fleet."
        irreversibleDescription="Deleting rb-07 cannot be undone."
        verificationPhrase="rb-07"
        verificationLabel="robot ID"
        confirmLabel="Delete Robot"
        onConfirm={onConfirm}
      />,
    );
    const submit = screen.getByRole("button", { name: "Delete Robot" }) as HTMLButtonElement;
    const input = screen.getByLabelText(/To confirm, type the robot ID/);
    expect(document.activeElement).toBe(input);
    expect(submit.disabled).toBe(true);
    await userEvent.type(input, "rb-0");
    expect(submit.disabled).toBe(true);
    await userEvent.type(input, "7{Enter}");
    expect(submit.disabled).toBe(false);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Deleting rb-07 cannot be undone.")).toBeTruthy();
  });

  it("disables both buttons while loading and shows the error inline", () => {
    render(
      <DestructiveActionModal
        open
        title="Revoke Key"
        description="The key stops working."
        verificationPhrase="ci-deploy"
        confirmLabel="Revoke Key"
        onConfirm={() => {}}
        loading
        error={new Error("Couldn't revoke the key. Try again.")}
      />,
    );
    expect((screen.getByRole("button", { name: "Cancel" }) as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect(screen.getByRole("alert").textContent).toBe("Couldn't revoke the key. Try again.");
  });
});

describe("ErrorMessage", () => {
  it("reads its status first even without a visible label", () => {
    render(<ErrorMessage>This email address is already in use.</ErrorMessage>);
    expect(screen.getByRole("alert").textContent).toBe(
      "Error: This email address is already in use.",
    );
  });

  it("takes a thrown Error and a message with a follow-up link", () => {
    const { rerender } = render(<ErrorMessage label="Upload" error={new Error("Too large.")} />);
    expect(screen.getByRole("alert").textContent).toBe("Upload:Too large.");
    rerender(
      <ErrorMessage error={{ message: "The request failed.", action: "Contact us", link: "/s" }} />,
    );
    expect(screen.getByRole("link", { name: "Contact us" }).getAttribute("href")).toBe("/s");
  });
});

describe("LoadingDots", () => {
  it("announces the label and hides the dots", () => {
    const { container } = render(<LoadingDots>Saving</LoadingDots>);
    const root = container.querySelector('[data-slot="loading-dots"]')!;
    expect(root.getAttribute("aria-live")).toBe("polite");
    expect(root.querySelector("[aria-hidden]")?.children).toHaveLength(3);
  });
});

describe("SearchInput", () => {
  it("clears with the button and with Escape", async () => {
    const onClear = vi.fn();
    render(<SearchInput aria-label="Search robots" onClear={onClear} />);
    const input = screen.getByRole("searchbox", { name: "Search robots" }) as HTMLInputElement;
    await userEvent.type(input, "atlas");
    await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(input.value).toBe("");
    await userEvent.type(input, "nova{Escape}");
    expect(input.value).toBe("");
    expect(onClear).toHaveBeenCalledTimes(2);
  });

  it("focuses on ⌘K when the shortcut is on", async () => {
    render(<SearchInput aria-label="Search" shortcut />);
    await userEvent.keyboard("{Meta>}k{/Meta}");
    expect(document.activeElement).toBe(screen.getByRole("searchbox"));
  });
});

describe("ShowMore", () => {
  it("clips the content until the trigger expands it", async () => {
    render(
      <ShowMore>
        <ShowMoreContent>Long notes</ShowMoreContent>
        <ShowMoreTrigger />
      </ShowMore>,
    );
    const trigger = screen.getByRole("button", { name: "Show more" });
    const content = screen.getByText("Long notes");
    expect(trigger.getAttribute("aria-controls")).toBe(content.id);
    expect(content.getAttribute("data-state")).toBe("closed");
    await userEvent.click(trigger);
    expect(screen.getByRole("button", { name: "Show less" }).getAttribute("aria-expanded")).toBe(
      "true",
    );
    expect(content.getAttribute("data-state")).toBe("open");
  });
});

describe("SplitButton", () => {
  it("runs the primary action and opens the menu from a named trigger", async () => {
    const onClick = vi.fn();
    render(
      <SplitButton label="Deploy" onClick={onClick} menuLabel="More deploy options">
        <DropdownMenuItem>Deploy to preview</DropdownMenuItem>
      </SplitButton>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Deploy" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "More deploy options" }));
    expect(await screen.findByRole("menuitem", { name: "Deploy to preview" })).toBeTruthy();
  });
});

describe("FilterParamsBar", () => {
  const filters = [
    {
      id: "site",
      label: "Site",
      options: [
        { value: "mty", label: "Monterrey DC-2" },
        { value: "gdl", label: "Guadalajara Hub" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [{ value: "error", label: "Error" }],
      suggestion: "error",
    },
    {
      id: "team",
      label: "Team",
      options: [{ value: "acme", label: "Acme" }],
      readonly: true,
      note: "Set by the workspace.",
    },
  ];

  it("applies a suggestion, removes a pill, and keeps a readonly one", async () => {
    const onValuesChange = vi.fn();
    render(
      <FilterParamsBar
        filters={filters}
        defaultValues={{ site: "mty", team: "acme" }}
        onValuesChange={onValuesChange}
      />,
    );
    expect(screen.getByText("Monterrey DC-2")).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Remove Team filter" })).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Apply Status Error" }));
    expect(onValuesChange).toHaveBeenLastCalledWith({ site: "mty", team: "acme", status: "error" });
    await userEvent.click(screen.getByRole("button", { name: "Remove Site filter" }));
    expect(screen.queryByText("Monterrey DC-2")).toBeNull();
  });

  it("picks an option from the searchable list", async () => {
    render(<FilterParamsBar filters={filters} />);
    await userEvent.click(screen.getByRole("button", { name: "Add filter" }));
    await userEvent.click(await screen.findByRole("option", { name: "Guadalajara Hub" }));
    expect(screen.getByText("Guadalajara Hub")).toBeTruthy();
  });

  it("keeps its state in the URL through useFilterParams", async () => {
    window.history.replaceState(null, "", "/runs?site=gdl&page=2");
    function Bar() {
      const [values, setValues] = useFilterParams(["site", "status"]);
      return <FilterParamsBar filters={filters} values={values} onValuesChange={setValues} />;
    }
    render(<Bar />);
    expect(screen.getByText("Guadalajara Hub")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Remove Site filter" }));
    expect(window.location.search).toBe("?page=2");
    act(() => {
      window.history.replaceState(null, "", "/runs?status=error&page=2");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    expect(screen.getByText("Error")).toBeTruthy();
  });
});
