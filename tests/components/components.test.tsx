/**
 * The smaller components, on the behaviour a screen would silently lose.
 *
 * Deliberately not an echo of every class string: pinning the design system to
 * whatever it looked like on the day is the mistake a restyle would pay for.
 * What is asserted is roles, `aria-*`, the `data-*` a consumer styles against,
 * and the handful of layout facts a caller depends on. Button, Dialog, Field,
 * DropdownMenu, ContextMenu, Popover, Command and Drawer have their own files.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { JSX } from "react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "../../src/components/alert";
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentTitle,
  AttachmentTrigger,
} from "../../src/components/attachment";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "../../src/components/avatar";
import { Badge } from "../../src/components/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../src/components/breadcrumb";
import { Button } from "../../src/components/button";
import { ButtonGroup, ButtonGroupText } from "../../src/components/button-group";
import { Card, CardTitle } from "../../src/components/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../../src/components/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "../../src/components/item";
import { Kbd, KbdGroup } from "../../src/components/kbd";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../src/components/pagination";
import { Progress } from "../../src/components/progress";
import { RadioGroup, RadioGroupItem } from "../../src/components/radio-group";
import { ScrollArea } from "../../src/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/select";
import { Spinner } from "../../src/components/spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/components/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/tabs";
import { Toggle } from "../../src/components/toggle";
import { ToggleGroup, ToggleGroupItem } from "../../src/components/toggle-group";

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

  it.each(["success", "warning", "info", "destructive", "quiet"] as const)(
    "%s is a soft surface on a semantic role, never a palette step or a coloured stroke",
    (variant) => {
      render(<Badge variant={variant}>x</Badge>);
      const el = screen.getByText("x");
      expect(el.getAttribute("data-variant")).toBe(variant);
      expect(el.className).toContain("border-transparent");
      expect(el.className).toMatch(
        /\bbg-(success|warning|info|destructive)-surface\b|\bbg-muted\b/,
      );
      // The steps live behind the roles in styles.css; the component names none.
      expect(el.className).not.toMatch(
        // A bare border-<status>, not `aria-invalid:border-destructive`, the
        // validation ring every Badge carries.
        /\b(green|emerald|amber|sky|blue|red)-\d|(?<![\w:-])border-(success|warning|info|destructive)\b/,
      );
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
    // Room to grow is only half of it, and the half that used to be missing: the
    // trigger is `whitespace-nowrap` by default, so lifting the clamp alone left a
    // long value on one line, overflowing the box it was supposed to have grown for.
    expect(trigger.className).toContain("whitespace-normal");
    expect(trigger.className).not.toContain("whitespace-nowrap");
  });

  it("reads a wrapped value from the left, because a native button would centre it", () => {
    render(pickOne());
    expect(screen.getByTestId("model").className).toContain("text-left");
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

  it("is named by its caption, and scrolls inside its own frame", () => {
    render(
      <Table>
        <TableCaption>Runs in the last 24 hours</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>4128</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const table = screen.getByRole("table", { name: "Runs in the last 24 hours" });
    // The frame, not the page, is what scrolls a wide table.
    expect(table.parentElement?.getAttribute("data-slot")).toBe("table-container");
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

describe("Kbd and Spinner", () => {
  it("renders a shortcut as a <kbd>, and groups a chord into one", () => {
    render(
      <KbdGroup>
        <Kbd>Cmd</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>,
    );
    const keys = screen.getAllByText(/Cmd|K/);
    expect(keys.map((key) => key.tagName)).toEqual(["KBD", "KBD"]);
    expect(keys[0]?.getAttribute("data-slot")).toBe("kbd");
    expect(keys[0]?.parentElement?.getAttribute("data-slot")).toBe("kbd-group");
  });

  it("announces that something is in flight, rather than spinning silently", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status", { name: "Loading" });
    expect(spinner.getAttribute("data-slot")).toBe("spinner");
  });
});

/**
 * A radio group is the one control where the keyboard contract is the whole
 * component: the arrows move the selection, not just the focus, and Tab enters
 * and leaves the group as a single stop.
 */
describe("RadioGroup", () => {
  function group(): JSX.Element {
    return (
      <RadioGroup defaultValue="draft" aria-label="Visibility">
        <RadioGroupItem value="draft" aria-label="Draft" />
        <RadioGroupItem value="internal" aria-label="Internal" />
        <RadioGroupItem value="public" aria-label="Public" />
      </RadioGroup>
    );
  }

  it("checks exactly one option and reports it to assistive technology", () => {
    render(group());
    const radios = screen.getAllByRole("radio");
    expect(radios.map((radio) => radio.getAttribute("aria-checked"))).toEqual([
      "true",
      "false",
      "false",
    ]);
    expect(screen.getByRole("radiogroup", { name: "Visibility" })).not.toBeNull();
  });

  it("is one tab stop, and the arrows move the selection inside it", async () => {
    const user = userEvent.setup();
    render(group());
    // Tab enters the group at the checked option, not at the first one, and
    // leaves it in one press: three radios, one stop.
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Draft" }));

    // Press and release as two steps, because that is what a key press is.
    // Radix defers the focus move to a macrotask and decides whether to *check*
    // the newly focused radio by asking whether an arrow is still down; a
    // keydown and keyup collapsed into one tick answer no, and the selection
    // would silently stay behind while the focus ring moved on.
    await user.keyboard("{ArrowDown>}");
    await user.keyboard("{/ArrowDown}");
    const internal = screen.getByRole("radio", { name: "Internal" });
    expect(document.activeElement).toBe(internal);
    expect(internal.getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "Draft" }).getAttribute("aria-checked")).toBe("false");

    await user.tab();
    expect(screen.getByRole("radiogroup").contains(document.activeElement)).toBe(false);
  });
});

describe("Toggle and ToggleGroup", () => {
  it("reports a toggle's state as pressed, and flips it from the keyboard", async () => {
    render(<Toggle aria-label="Bold" />);
    const toggle = screen.getByRole("button", { name: "Bold" });
    expect(toggle.getAttribute("aria-pressed")).toBe("false");

    await userEvent.tab();
    await userEvent.keyboard("{ }");
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
  });

  it("keeps a single-choice group to one selected item", async () => {
    render(
      <ToggleGroup type="single" defaultValue="list" aria-label="Layout">
        <ToggleGroupItem value="list" aria-label="List" />
        <ToggleGroupItem value="grid" aria-label="Grid" />
      </ToggleGroup>,
    );
    const items = screen.getAllByRole("radio");
    expect(items.map((item) => item.getAttribute("aria-checked"))).toEqual(["true", "false"]);

    await userEvent.click(screen.getByRole("radio", { name: "Grid" }));
    expect(screen.getByRole("radio", { name: "Grid" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("radio", { name: "List" }).getAttribute("aria-checked")).toBe("false");
  });

  it("lets a multiple-choice group hold two at once", async () => {
    render(
      <ToggleGroup type="multiple" aria-label="Marks">
        <ToggleGroupItem value="bold" aria-label="Bold" />
        <ToggleGroupItem value="italic" aria-label="Italic" />
      </ToggleGroup>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Bold" }));
    await userEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getAllByRole("button").map((item) => item.getAttribute("aria-pressed"))).toEqual([
      "true",
      "true",
    ]);
  });
});

describe("Breadcrumb and Pagination", () => {
  it("names the trail, marks the page the reader is on, and hides the separators", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/datasets">Datasets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Batch 12</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(screen.getByRole("navigation", { name: "breadcrumb" })).not.toBeNull();
    expect(screen.getByRole("link", { name: "Datasets" }).getAttribute("href")).toBe("/datasets");
    // The last crumb is where the reader already is: announced as current, and
    // not offered as somewhere to go.
    const current = screen.getByText("Batch 12");
    expect(current.getAttribute("aria-current")).toBe("page");
    expect(current.getAttribute("aria-disabled")).toBe("true");
    const separator = document.querySelector("[data-slot=breadcrumb-separator]");
    expect(separator?.getAttribute("aria-hidden")).toBe("true");
  });

  it("names the pager, marks the current page, and keeps every step a real link", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="?page=1" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=1" isActive={false}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="?page=2" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="?page=3" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByRole("navigation", { name: "pagination" })).not.toBeNull();
    expect(screen.getByRole("link", { name: "Go to previous page" })).not.toBeNull();
    expect(screen.getByRole("link", { name: "Go to next page" })).not.toBeNull();

    const current = screen.getByRole("link", { name: "2" });
    expect(current.getAttribute("aria-current")).toBe("page");
    // `data-active` is the attribute the layer's variant is keyed on, and the
    // reason that variant excludes `"false"`: an inactive link renders it too.
    expect(current.getAttribute("data-active")).toBe("true");
    expect(screen.getByRole("link", { name: "1" }).getAttribute("data-active")).toBe("false");
  });
});

describe("Avatar", () => {
  it("shows the fallback while the image has not loaded, which is the usual case", async () => {
    render(
      <Avatar>
        <AvatarImage src="/nobody.png" alt="Yael" />
        <AvatarFallback>YA</AvatarFallback>
      </Avatar>,
    );
    expect(await screen.findByText("YA")).toBeTruthy();
  });

  it("carries its size as data, so a stack can size its overflow count to match", () => {
    render(
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>,
    );
    const avatars = document.querySelectorAll("[data-slot=avatar]");
    expect([...avatars].map((avatar) => avatar.getAttribute("data-size"))).toEqual(["sm", "sm"]);
    expect(screen.getByText("+3").getAttribute("data-slot")).toBe("avatar-group-count");
  });
});

describe("ButtonGroup, Item and Empty", () => {
  it("is a group to a screen reader, and every segment carries the slot the rounding reads", () => {
    render(
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Button>Go</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).not.toBeNull();
    // The group rounds "the last child carrying a data-slot". A text segment
    // without one is invisible to that rule and loses its corner.
    expect(screen.getByText("https://").getAttribute("data-slot")).toBe("button-group-text");
  });

  it("presents a row as a list entry with its own title, description and actions", () => {
    render(
      <ItemGroup>
        <Item>
          <ItemContent>
            <ItemTitle>batch-12.zip</ItemTitle>
            <ItemDescription>311.9 MB, uploaded today</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm">Open</Button>
          </ItemActions>
        </Item>
      </ItemGroup>,
    );
    expect(screen.getByRole("list")).not.toBeNull();
    expect(screen.getByText("batch-12.zip").getAttribute("data-slot")).toBe("item-title");
    expect(screen.getByText("311.9 MB, uploaded today").getAttribute("data-slot")).toBe(
      "item-description",
    );
    expect(screen.getByRole("button", { name: "Open" })).not.toBeNull();
  });

  it("says what is missing and what to do about it, rather than showing a blank panel", () => {
    render(
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" />
          <EmptyTitle>No batches yet</EmptyTitle>
          <EmptyDescription>Upload one to get started.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Upload</Button>
        </EmptyContent>
      </Empty>,
    );
    expect(screen.getByText("No batches yet").getAttribute("data-slot")).toBe("empty-title");
    expect(screen.getByText("Upload one to get started.").getAttribute("data-slot")).toBe(
      "empty-description",
    );
    expect(screen.getByRole("button", { name: "Upload" })).not.toBeNull();
  });
});

describe("Attachment", () => {
  it("carries its progress as state, which is the hook every part styles from", () => {
    render(
      <AttachmentGroup>
        <Attachment state="uploading">
          <AttachmentContent>
            <AttachmentTitle>batch-12.zip</AttachmentTitle>
            <AttachmentDescription>311.9 MB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
        <Attachment state="error">
          <AttachmentContent>
            <AttachmentTitle>broken.zip</AttachmentTitle>
          </AttachmentContent>
        </Attachment>
      </AttachmentGroup>,
    );
    const cards = [...document.querySelectorAll("[data-slot=attachment]")];
    expect(cards.map((card) => card.getAttribute("data-state"))).toEqual(["uploading", "error"]);
  });

  it("gives the whole card a trigger that cannot submit a form by accident", () => {
    render(
      <Attachment>
        <AttachmentTrigger aria-label="Open batch-12.zip" />
        <AttachmentContent>
          <AttachmentTitle>batch-12.zip</AttachmentTitle>
        </AttachmentContent>
      </Attachment>,
    );
    const trigger = screen.getByRole("button", { name: "Open batch-12.zip" });
    expect(trigger.getAttribute("type")).toBe("button");
  });
});

describe("ScrollArea", () => {
  it("puts the content in a viewport, because that is what actually scrolls", () => {
    render(
      <ScrollArea>
        <p>Three hundred rows.</p>
      </ScrollArea>,
    );
    const viewport = document.querySelector("[data-slot=scroll-area-viewport]") as HTMLElement;
    expect(viewport).not.toBeNull();
    expect(viewport.textContent).toBe("Three hundred rows.");
    // Radix makes the viewport the scroll container; a caller who scrolls the
    // root instead gets nothing, which is why the slot is part of the contract.
    expect(viewport.closest("[data-slot=scroll-area]")).not.toBeNull();
  });
});
