/**
 * Sidebar: the shell state a product leans on. The trigger and the keyboard
 * shortcut toggle it, the state is exposed as `data-state` for styling and
 * persisted in a cookie, a controlled caller is told, an active item says so
 * in an attribute, and under the breakpoint the whole thing becomes a Sheet —
 * a labelled dialog — instead of a fixed panel.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../../src/components/sidebar";

const DESKTOP = 1024;
const PHONE = 500;

afterEach(() => {
  window.innerWidth = DESKTOP;
  document.cookie = "sidebar_state=; max-age=0; path=/";
});

function Shell(props: React.ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider {...props}>
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Inbox</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Archive</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  );
}

const panel = () => document.querySelector('[data-slot="sidebar"]')!;
const trigger = () => screen.getByRole("button", { name: "Toggle Sidebar" });

describe("Sidebar", () => {
  it("refuses to render outside its provider, so a missing shell is a build error not a blank", () => {
    function Orphan() {
      useSidebar();
      return null;
    }
    const quiet = vi.spyOn(console, "error").mockImplementation(() => undefined);
    expect(() => render(<Orphan />)).toThrow(/within a SidebarProvider/);
    quiet.mockRestore();
  });

  it("toggles between expanded and collapsed from the trigger, and remembers it in a cookie", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    expect(panel().getAttribute("data-state")).toBe("expanded");

    await user.click(trigger());
    expect(panel().getAttribute("data-state")).toBe("collapsed");
    expect(panel().getAttribute("data-collapsible")).toBe("offcanvas");
    expect(document.cookie).toContain("sidebar_state=false");

    await user.click(trigger());
    expect(panel().getAttribute("data-state")).toBe("expanded");
    expect(document.cookie).toContain("sidebar_state=true");
  });

  it("toggles from the keyboard shortcut", async () => {
    const user = userEvent.setup();
    render(<Shell />);
    await user.keyboard("{Control>}b{/Control}");
    expect(panel().getAttribute("data-state")).toBe("collapsed");
    await user.keyboard("{Meta>}b{/Meta}");
    expect(panel().getAttribute("data-state")).toBe("expanded");
  });

  it("tells a controlled caller instead of changing on its own", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Shell open onOpenChange={onOpenChange} />);
    await user.click(trigger());
    expect(onOpenChange).toHaveBeenCalledWith(false);
    // Controlled: the caller did not update `open`, so the panel stays where it was.
    expect(panel().getAttribute("data-state")).toBe("expanded");
  });

  it("marks the active item in an attribute a style can key on", () => {
    render(<Shell />);
    // Both spellings are emitted: `data-active="true"` and `data-active="false"`.
    // Tailwind's built-in `data-active:` variant matches either — presence is
    // enough — so the `data-active:` styles in this component resolve through
    // shadcn's variant layer in src/theme/shadcn.css, which excludes "false".
    expect(screen.getByRole("button", { name: "Inbox" }).getAttribute("data-active")).toBe("true");
    expect(screen.getByRole("button", { name: "Archive" }).getAttribute("data-active")).toBe(
      "false",
    );
  });

  it("becomes a labelled Sheet under the breakpoint", async () => {
    const user = userEvent.setup();
    window.innerWidth = PHONE;
    render(<Shell />);
    expect(screen.queryByRole("dialog")).toBeNull();

    await user.click(trigger());
    const sheet = await screen.findByRole("dialog", { name: "Sidebar" });
    expect(sheet.getAttribute("data-mobile")).toBe("true");
    expect(screen.getByRole("button", { name: "Inbox" })).toBeTruthy();
  });
});
