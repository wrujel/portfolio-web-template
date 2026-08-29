// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Projects from "@/components/Projects/Projects";
import { cardContent } from "@/components/Projects/Projects.data";

vi.mock("framer-motion/dom", () => ({ scroll: vi.fn() }));

/**
 * Projects reads `window.innerWidth` to decide between hover and scroll
 * driving. This file runs without a DOM so the `typeof window` guard takes its
 * server branch — the case that would otherwise only show up as a build error.
 */
describe("Projects rendered on the server", () => {
  it("renders without touching window", () => {
    expect(() => renderToStaticMarkup(<Projects />)).not.toThrow();
  });

  it("emits every project card with the first one expanded", () => {
    const html = renderToStaticMarkup(<Projects />);

    for (const { title } of cardContent) {
      expect(html).toContain(title);
    }
    expect(html).toContain(cardContent[0].description);
    expect(html).not.toContain(cardContent[1].description);
  });
});
