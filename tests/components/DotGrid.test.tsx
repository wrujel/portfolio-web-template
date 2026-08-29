import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DotGrid from "@/components/ui/DotGrid";
import { createFakeCanvasContext, FakeResizeObserver } from "../setup";

const gsapTo = vi.hoisted(() => vi.fn());
const killTweensOf = vi.hoisted(() => vi.fn());
vi.mock("gsap", () => ({
  gsap: { registerPlugin: vi.fn(), killTweensOf, to: gsapTo },
}));
vi.mock("gsap/InertiaPlugin", () => ({ InertiaPlugin: {} }));

const AREA = { width: 100, height: 100 };

/**
 * A 100x100 area with 10px dots on a 10px gap lays out a 5x5 grid whose
 * centres sit at 10, 30, 50, 70 and 90 on both axes.
 */
const GRID = { dotSize: 10, gap: 10 } as const;
const DOT_COUNT = 25;

let frames: FrameRequestCallback[] = [];
let ctx: ReturnType<typeof createFakeCanvasContext>;
let getContext: ReturnType<typeof vi.spyOn>;

/** Runs the frame the draw loop queued last. */
const nextFrame = () => frames.pop()!(0);

const move = (clientX: number, clientY: number) =>
  window.dispatchEvent(new MouseEvent("mousemove", { clientX, clientY }));

const click = (clientX: number, clientY: number) =>
  window.dispatchEvent(new MouseEvent("click", { clientX, clientY }));

/** Completes the inertia tween gsap was handed at `index`. */
const completeTween = (index: number) => {
  const vars = gsapTo.mock.calls[index][1] as { onComplete?: () => void };
  vars.onComplete?.();
};

beforeEach(() => {
  frames = [];
  ctx = createFakeCanvasContext();

  getContext = vi
    .spyOn(HTMLCanvasElement.prototype, "getContext")
    .mockReturnValue(ctx as unknown as CanvasRenderingContext2D);

  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    ...AREA,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: AREA.width,
    bottom: AREA.height,
    toJSON: () => ({}),
  });

  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
    frames.push(cb);
    return frames.length;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.spyOn(performance, "now").mockReturnValue(1_000);
});

describe("DotGrid", () => {
  it("renders a canvas inside a sized wrapper", () => {
    const { container } = render(<DotGrid />);
    expect(container.querySelector("canvas")).not.toBeNull();
    expect(container.querySelector("section")).toHaveClass("h-full", "w-full");
  });

  it("applies the className and inline style it is given", () => {
    const { container } = render(
      <DotGrid className="custom" style={{ opacity: 0.5 }} />,
    );
    const section = container.querySelector("section")!;
    expect(section).toHaveClass("custom");
    expect(section).toHaveStyle({ opacity: "0.5" });
  });

  it("scales the backing canvas by the device pixel ratio", () => {
    vi.stubGlobal("devicePixelRatio", 2);
    const { container } = render(<DotGrid {...GRID} />);
    const canvas = container.querySelector("canvas")!;

    expect(canvas.width).toBe(AREA.width * 2);
    expect(canvas.height).toBe(AREA.height * 2);
    expect(canvas.style.width).toBe(`${AREA.width}px`);
    expect(ctx.scale).toHaveBeenCalledWith(2, 2);
  });

  it("falls back to a ratio of 1 when the browser reports none", () => {
    vi.stubGlobal("devicePixelRatio", 0);
    const { container } = render(<DotGrid {...GRID} />);
    expect(container.querySelector("canvas")!.width).toBe(AREA.width);
  });

  it("draws one dot per grid cell", () => {
    render(<DotGrid {...GRID} />);
    // The draw effect runs before the grid is built, so the first paint is
    // empty and the frame after it covers the full grid.
    ctx.fill.mockClear();
    nextFrame();
    expect(ctx.fill).toHaveBeenCalledTimes(DOT_COUNT);
    expect(ctx.clearRect).toHaveBeenCalled();
  });

  it("paints every dot in the grid, near and far from the pointer", () => {
    render(
      <DotGrid
        {...GRID}
        baseColor="#000000"
        activeColor="#ffffff"
        proximity={50}
      />,
    );
    ctx.save.mockClear();
    nextFrame();

    // The pointer sits at the origin: near dots interpolate, far ones do not.
    expect(ctx.save).toHaveBeenCalledTimes(DOT_COUNT);
    expect(ctx.translate).toHaveBeenCalledWith(10, 10);
    expect(ctx.translate).toHaveBeenCalledWith(90, 90);
  });

  it("treats an unparseable colour as black rather than throwing", () => {
    expect(() =>
      render(<DotGrid {...GRID} baseColor="rebeccapurple" />),
    ).not.toThrow();
    nextFrame();
    expect(ctx.fill).toHaveBeenCalled();
  });

  it("skips painting entirely when Path2D is unavailable", () => {
    vi.stubGlobal("Path2D", undefined);
    render(<DotGrid {...GRID} />);
    expect(ctx.fill).not.toHaveBeenCalled();
    expect(frames).toHaveLength(0);
  });

  it("skips painting when the canvas has no 2d context", () => {
    getContext.mockReturnValueOnce(null);
    render(<DotGrid {...GRID} />);
    expect(ctx.clearRect).not.toHaveBeenCalled();
  });

  it("builds the grid even when the context is unavailable for scaling", () => {
    getContext
      .mockReturnValueOnce(ctx as unknown as CanvasRenderingContext2D)
      .mockReturnValueOnce(null);
    render(<DotGrid {...GRID} />);
    expect(ctx.scale).not.toHaveBeenCalled();
  });

  it("stops painting once the canvas is gone", () => {
    const { unmount } = render(<DotGrid {...GRID} />);
    const pending = frames.pop()!;
    unmount();

    ctx.clearRect.mockClear();
    pending(0);
    expect(ctx.clearRect).not.toHaveBeenCalled();
  });

  it("rebuilds the grid when the wrapper resizes", () => {
    render(<DotGrid {...GRID} />);
    const observer = FakeResizeObserver.instances.at(-1)!;
    expect(observer.observe).toHaveBeenCalled();

    ctx.scale.mockClear();
    observer.callback([], observer as unknown as ResizeObserver);
    expect(ctx.scale).toHaveBeenCalled();
  });

  it("ignores a resize that arrives after unmount", () => {
    const { unmount } = render(<DotGrid {...GRID} />);
    const observer = FakeResizeObserver.instances.at(-1)!;
    unmount();

    ctx.scale.mockClear();
    observer.callback([], observer as unknown as ResizeObserver);
    expect(ctx.scale).not.toHaveBeenCalled();
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it("falls back to a window resize listener without ResizeObserver", () => {
    Reflect.deleteProperty(globalThis, "ResizeObserver");
    const add = vi.spyOn(window, "addEventListener");
    const remove = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<DotGrid {...GRID} />);
    expect(add).toHaveBeenCalledWith("resize", expect.any(Function));

    unmount();
    expect(remove).toHaveBeenCalledWith("resize", expect.any(Function));
  });
});

describe("DotGrid pointer interaction", () => {
  it("pushes nearby dots when the pointer moves fast", () => {
    render(<DotGrid {...GRID} proximity={50} speedTrigger={10} />);
    move(20, 20);

    expect(killTweensOf).toHaveBeenCalled();
    expect(gsapTo).toHaveBeenCalledWith(
      expect.objectContaining({ cx: 10, cy: 10 }),
      expect.objectContaining({
        inertia: expect.objectContaining({ resistance: 750 }),
      }),
    );
  });

  it("leaves dots alone when the pointer is slower than the trigger", () => {
    render(<DotGrid {...GRID} proximity={50} speedTrigger={1e9} />);
    move(20, 20);
    expect(gsapTo).not.toHaveBeenCalled();
  });

  it("clamps the recorded speed to maxSpeed", () => {
    render(
      <DotGrid {...GRID} proximity={50} speedTrigger={10} maxSpeed={100} />,
    );
    move(20, 20);
    // Raw speed would be ~1768px/s; clamping keeps the velocity term small.
    const { inertia } = gsapTo.mock.calls[0][1] as {
      inertia: { xOffset: number };
    };
    expect(Math.abs(inertia.xOffset)).toBeLessThan(11);
  });

  it("throttles moves to one every 50ms", () => {
    render(<DotGrid {...GRID} proximity={50} speedTrigger={10} />);

    move(20, 20);
    const afterFirst = gsapTo.mock.calls.length;
    expect(afterFirst).toBeGreaterThan(0);

    // Same timestamp: the throttle swallows this one.
    move(40, 40);
    expect(gsapTo).toHaveBeenCalledTimes(afterFirst);

    vi.mocked(performance.now).mockReturnValue(1_100);
    move(40, 40);
    expect(gsapTo.mock.calls.length).toBeGreaterThan(afterFirst);
  });

  it("does not re-push a dot whose tween is still running", () => {
    render(<DotGrid {...GRID} proximity={50} speedTrigger={10} />);

    move(20, 20);
    const afterFirst = gsapTo.mock.calls.length;

    vi.mocked(performance.now).mockReturnValue(1_100);
    move(20, 20);
    expect(gsapTo).toHaveBeenCalledTimes(afterFirst);
  });

  it("returns a dot to its resting offset once the push finishes", () => {
    render(
      <DotGrid {...GRID} proximity={50} speedTrigger={10} returnDuration={2} />,
    );
    move(20, 20);
    const pushes = gsapTo.mock.calls.length;

    completeTween(0);

    expect(gsapTo).toHaveBeenCalledTimes(pushes + 1);
    expect(gsapTo.mock.calls[pushes][1]).toMatchObject({
      xOffset: 0,
      yOffset: 0,
      duration: 2,
      ease: "elastic.out(1,0.75)",
    });
  });

  it("shockwaves the dots around a click", () => {
    render(<DotGrid {...GRID} shockRadius={30} shockStrength={2} />);
    click(10, 10);

    // Only the dot under the cursor and its immediate neighbours are in range.
    expect(gsapTo).toHaveBeenCalled();
    const targets = gsapTo.mock.calls.map(
      ([dot]) => dot as { cx: number; cy: number },
    );
    expect(targets).toContainEqual(expect.objectContaining({ cx: 10, cy: 10 }));
    expect(targets).not.toContainEqual(
      expect.objectContaining({ cx: 90, cy: 90 }),
    );
  });

  it("returns clicked dots to rest once their push finishes", () => {
    render(<DotGrid {...GRID} shockRadius={30} returnDuration={1.5} />);
    click(10, 10);
    const pushes = gsapTo.mock.calls.length;

    completeTween(0);
    expect(gsapTo.mock.calls[pushes][1]).toMatchObject({
      xOffset: 0,
      yOffset: 0,
      duration: 1.5,
    });
  });

  it("does not re-shock a dot whose tween is still running", () => {
    render(<DotGrid {...GRID} shockRadius={30} />);
    click(10, 10);
    const afterFirst = gsapTo.mock.calls.length;

    click(10, 10);
    expect(gsapTo).toHaveBeenCalledTimes(afterFirst);
  });

  it("detaches its window listeners on unmount", () => {
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<DotGrid {...GRID} />);
    unmount();

    expect(remove).toHaveBeenCalledWith("mousemove", expect.any(Function));
    expect(remove).toHaveBeenCalledWith("click", expect.any(Function));
  });
});
