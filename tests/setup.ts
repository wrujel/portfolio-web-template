import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

/**
 * jsdom ships none of the browser APIs the canvas/animation code reaches for,
 * so they are installed here as minimal, inspectable fakes. Individual tests
 * override them (via `vi.stubGlobal` / `vi.spyOn`) to exercise the fallbacks.
 *
 * A few suites opt into the `node` environment to exercise server rendering;
 * there is nothing to shim or clean up there, hence the `hasDom` guards.
 */
const hasDom = typeof window !== "undefined";

export interface FakeCanvasContext {
  scale: ReturnType<typeof vi.fn>;
  clearRect: ReturnType<typeof vi.fn>;
  save: ReturnType<typeof vi.fn>;
  restore: ReturnType<typeof vi.fn>;
  translate: ReturnType<typeof vi.fn>;
  fill: ReturnType<typeof vi.fn>;
  fillStyle: string;
}

export const createFakeCanvasContext = (): FakeCanvasContext => ({
  scale: vi.fn(),
  clearRect: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  fill: vi.fn(),
  fillStyle: "",
});

class FakePath2D {
  arc = vi.fn();
}

class FakeResizeObserver {
  static instances: FakeResizeObserver[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(public callback: ResizeObserverCallback) {
    FakeResizeObserver.instances.push(this);
  }
}

export { FakePath2D, FakeResizeObserver };

beforeEach(() => {
  if (!hasDom) return;

  FakeResizeObserver.instances.length = 0;

  vi.stubGlobal("Path2D", FakePath2D);
  vi.stubGlobal("ResizeObserver", FakeResizeObserver);
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );

  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    createFakeCanvasContext() as unknown as CanvasRenderingContext2D,
  );

  // Framer Motion probes for the Web Animations API before falling back.
  if (!Element.prototype.animate) {
    Element.prototype.animate = vi.fn(() => ({
      cancel: vi.fn(),
      finish: vi.fn(),
      pause: vi.fn(),
      play: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as Element["animate"];
  }
});

afterEach(() => {
  if (hasDom) cleanup();
});
