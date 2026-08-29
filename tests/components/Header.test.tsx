import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "@/components/Header/Header";
import { socialNetworks } from "@/components/Header/Header.data";

describe("Header", () => {
  it("links the wordmark back home", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders every social network in a new tab", () => {
    const { container } = render(<Header />);
    for (const { src } of socialNetworks) {
      const link = container.querySelector(`a[href="${src}"]`);
      expect(link, `missing link for ${src}`).not.toBeNull();
      expect(link).toHaveAttribute("target", "_blank");
    }
  });

  it("shows the terminal-style prompt", () => {
    render(<Header />);
    expect(screen.getByText("~/CODE_DEV")).toBeInTheDocument();
  });
});

describe("Header.data", () => {
  it("exposes one entry per network with an icon and an https url", () => {
    expect(socialNetworks).toHaveLength(6);
    for (const { logo, src } of socialNetworks) {
      expect(logo).toBeTruthy();
      expect(src).toMatch(/^https:\/\//);
    }
  });
});
