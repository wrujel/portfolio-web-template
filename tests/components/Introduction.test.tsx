import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Introduction from "@/components/Introduction/Introduction";

// The headline types itself out on a 900ms delay, then a character every 70ms.
const START_DELAY = 900;
const STEP = 70;
const FULL = "THEN CODE IT";

const advance = async (ms: number) => {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
};

describe("Introduction", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the terminal shell and both call-to-action links", () => {
    render(<Introduction />);
    expect(screen.getByText("~/portfolio — zsh")).toBeInTheDocument();
    expect(screen.getByText("> ./projects")).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByText("> ./contact")).toHaveAttribute("href", "/contacts");
  });

  it("holds the headline empty until the start delay elapses", async () => {
    vi.useFakeTimers();
    const { container } = render(<Introduction />);
    const heading = container.querySelector("h1")!;

    expect(heading).toHaveTextContent(/^IMAGINE IT,█$/);

    await advance(START_DELAY - 1);
    expect(heading).toHaveTextContent(/^IMAGINE IT,█$/);
  });

  it("types the headline one character at a time and then stops", async () => {
    vi.useFakeTimers();
    const { container } = render(<Introduction />);
    const heading = container.querySelector("h1")!;

    await advance(START_DELAY + STEP);
    expect(heading.textContent).toContain("T");
    expect(heading.textContent).not.toContain("TH");

    await advance(STEP * FULL.length);
    expect(heading.textContent).toContain(FULL);

    // Interval is cleared on the last character: more time changes nothing.
    const settled = heading.textContent;
    await advance(STEP * 10);
    expect(heading.textContent).toBe(settled);
  });

  it("clears its timers on unmount", async () => {
    vi.useFakeTimers();
    const clearTimeoutSpy = vi.spyOn(globalThis, "clearTimeout");
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");

    const { unmount } = render(<Introduction />);
    await advance(START_DELAY + STEP);
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it("clears only the timeout when unmounted before typing starts", () => {
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");

    const { unmount } = render(<Introduction />);
    unmount();

    expect(clearIntervalSpy).not.toHaveBeenCalled();
  });

  it("duplicates the marquee strip so the loop is seamless", () => {
    render(<Introduction />);
    // Six words, rendered twice per half, across two halves.
    expect(screen.getAllByText("Imagine it")).toHaveLength(4);
  });

  it("renders the avatar and its status badge", () => {
    render(<Introduction />);
    expect(screen.getByAltText("Avatar")).toBeInTheDocument();
    expect(screen.getByText("Status: online")).toBeInTheDocument();
  });
});
