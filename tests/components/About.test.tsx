import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import About from "@/components/About/About";
import { about, categories } from "@/components/About/About.data";

const tab = (label: string) => screen.getByText(`[ ] ${label}`).closest("div")!;

describe("About", () => {
  it("renders a counter tile per category", () => {
    render(<About />);
    for (const { text } of categories) {
      expect(screen.getByText(text, { selector: "p" })).toBeInTheDocument();
    }
  });

  it("opens on the first tab and lists its items", () => {
    render(<About />);
    expect(screen.getByText("[*] Skills")).toBeInTheDocument();

    for (const { tittle } of about[0].items) {
      expect(screen.getByText(tittle)).toBeInTheDocument();
    }
    // Items from a collapsed tab are not rendered.
    expect(screen.queryByText("Netflix Inc.")).not.toBeInTheDocument();
  });

  it("swaps the panel contents when another tab is clicked", async () => {
    const user = userEvent.setup();
    render(<About />);

    await user.click(tab("Experience"));

    expect(screen.getByText("[*] Experience")).toBeInTheDocument();
    expect(screen.getByText("[ ] Skills")).toBeInTheDocument();
    expect(screen.getByText("Netflix Inc.")).toBeInTheDocument();
    expect(screen.queryByText("Frontend Developer")).not.toBeInTheDocument();
  });

  it("marks the open tab with the neon border and the rest with the dim one", async () => {
    const user = userEvent.setup();
    render(<About />);

    expect(tab("Education")).toHaveClass("border-dim");
    await user.click(tab("Education"));

    const open = screen.getByText("[*] Education").closest("div")!;
    expect(open).toHaveClass("border-neon");
  });

  it("pairs every item with its own year badge", () => {
    render(<About />);

    for (const { tittle, date } of about[0].items) {
      const row = screen.getByText(tittle).closest("div")!;
      expect(within(row).getByText(date)).toBeInTheDocument();
    }
  });
});

describe("About.data", () => {
  it("gives every category a positive counter and a label", () => {
    expect(categories).toHaveLength(4);
    for (const { counter, text } of categories) {
      expect(counter).toBeGreaterThan(0);
      expect(text).not.toHaveLength(0);
    }
  });

  it("indexes the tab sections by array position", () => {
    about.forEach((section, i) => {
      expect(section.id).toBe(i);
      expect(section.items.length).toBeGreaterThan(0);
    });
  });
});
