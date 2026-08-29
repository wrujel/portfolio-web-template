import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import RootLayout, { metadata } from "@/app/layout";

const usePathname = vi.hoisted(() => vi.fn(() => "/"));
vi.mock("next/navigation", () => ({ usePathname }));

const markup = () =>
  renderToStaticMarkup(
    <RootLayout>
      <main id="page-content">content</main>
    </RootLayout>,
  );

describe("metadata", () => {
  it("carries the title and description used for SEO and link previews", () => {
    expect(metadata.title).toBe("CodeDev — Web Developer Portfolio");
    expect(metadata.description).toMatch(/portfolio of a web developer/i);
  });
});

describe("RootLayout", () => {
  it("declares the document language", () => {
    expect(markup()).toContain('<html lang="en">');
  });

  it("applies both font variables and the terminal palette to the body", () => {
    const html = markup();
    expect(html).toContain("--font-jetbrains-mono");
    expect(html).toContain("--font-vt323");
    expect(html).toMatch(/class="[^"]*bg-term[^"]*font-mono/);
  });

  it("renders the dot grid behind the content and hides it from assistive tech", () => {
    expect(markup()).toContain('aria-hidden="true"');
    expect(markup()).toMatch(/class="fixed inset-0 -z-10"/);
  });

  it("mounts the chrome and then the page children", () => {
    const html = markup();
    expect(html).toContain("~/CODE_DEV");
    expect(html).toContain('id="page-content"');
    expect(html.indexOf("~/CODE_DEV")).toBeLessThan(
      html.indexOf('id="page-content"'),
    );
  });
});
