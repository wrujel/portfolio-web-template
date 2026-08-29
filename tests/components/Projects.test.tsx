import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Projects from "@/components/Projects/Projects";
import { cardContent } from "@/components/Projects/Projects.data";

const scroll = vi.hoisted(() => vi.fn());
vi.mock("framer-motion/dom", () => ({ scroll }));

const DESKTOP = 1440;
const MOBILE = 400;

const setViewport = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
};

/** Runs the progress callback framer-motion's `scroll` was handed. */
const scrollTo = (progress: number) => {
  const onProgress = scroll.mock.calls.at(-1)?.[0] as (p: number) => void;
  act(() => onProgress(progress));
};

const card = (title: string) =>
  screen.getByText(title).closest("div")!.parentElement!.parentElement!;

/**
 * Framer Motion defers hover callbacks to `frame.postRender`, so the state
 * update lands a frame after the pointer event rather than with it.
 */
const flushFrame = () =>
  act(async () => {
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
  });

const originalWidth = window.innerWidth;

describe("Projects", () => {
  beforeEach(() => {
    setViewport(DESKTOP);
  });

  afterEach(() => {
    setViewport(originalWidth);
  });

  it("renders a card per project with a zero-padded slug", () => {
    render(<Projects />);
    cardContent.forEach(({ title }, i) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(
        screen.getByText(`[P_${String(i + 1).padStart(2, "0")}]`),
      ).toBeInTheDocument();
    });
  });

  it("expands the first card by default and hides the other descriptions", () => {
    render(<Projects />);
    expect(screen.getByText(cardContent[0].description)).toBeInTheDocument();
    expect(
      screen.queryByText(cardContent[1].description),
    ).not.toBeInTheDocument();
  });

  it("shows the skill icons only for the expanded card", () => {
    const { container } = render(<Projects />);
    expect(container.querySelectorAll("svg")).toHaveLength(
      cardContent[0].skills.length,
    );
  });

  it("expands the hovered card on desktop", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.hover(card(cardContent[2].title));
    await flushFrame();

    expect(screen.getByText(cardContent[2].description)).toBeInTheDocument();
    expect(
      screen.queryByText(cardContent[0].description),
    ).not.toBeInTheDocument();
  });

  it("does not wire up scroll tracking on desktop", () => {
    render(<Projects />);
    expect(scroll).not.toHaveBeenCalled();
  });

  it("credits the author in the footer badge", () => {
    render(<Projects />);
    expect(screen.getByText(/made with/i)).toBeInTheDocument();
  });

  describe("on mobile", () => {
    beforeEach(() => {
      setViewport(MOBILE);
    });

    it("drives the expanded card from scroll progress", () => {
      render(<Projects />);
      expect(scroll).toHaveBeenCalled();

      const expectExpanded = (i: number) => {
        expect(screen.getByText(cardContent[i].description)).toBeInTheDocument();
      };

      for (const [progress, index] of [
        [0.1, 0],
        [0.3, 1],
        [0.5, 2],
        [0.7, 3],
        [0.9, 4],
      ] as const) {
        scrollTo(progress);
        expectExpanded(index);
      }
    });

    it("leaves the selection untouched on the segment boundaries", () => {
      render(<Projects />);

      scrollTo(0.9);
      expect(screen.getByText(cardContent[4].description)).toBeInTheDocument();

      // 0.2/0.4/0.6 satisfy none of the exclusive comparisons.
      scrollTo(0.2);
      expect(screen.getByText(cardContent[4].description)).toBeInTheDocument();
    });

    it("ignores hover", async () => {
      const user = userEvent.setup();
      render(<Projects />);

      await user.hover(card(cardContent[3].title));
      await flushFrame();

      expect(screen.getByText(cardContent[0].description)).toBeInTheDocument();
      expect(
        screen.queryByText(cardContent[3].description),
      ).not.toBeInTheDocument();
    });
  });

  it("treats a zero-width window as desktop", async () => {
    // `width ? width < 768 : false` — a falsy width takes the non-mobile path.
    setViewport(0);
    const user = userEvent.setup();
    render(<Projects />);

    expect(scroll).not.toHaveBeenCalled();
    await user.hover(card(cardContent[1].title));
    await flushFrame();
    expect(screen.getByText(cardContent[1].description)).toBeInTheDocument();
  });
});

describe("Projects.data", () => {
  it("gives every project an id, image and five skills", () => {
    expect(cardContent).toHaveLength(5);
    cardContent.forEach((project, i) => {
      expect(project.id).toBe(i);
      expect(project.imageUrl).toMatch(/^\/assets\//);
      expect(project.skills).toHaveLength(5);
      for (const { icon } of project.skills) expect(icon).toBeTruthy();
    });
  });
});
