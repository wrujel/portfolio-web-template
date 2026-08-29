import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Avatar from "@/components/Avatar/Avatar";
import AvatarWithTablet from "@/components/Avatar/AvatarWithTablet";

describe("Avatar", () => {
  it("renders the standing avatar image", () => {
    render(<Avatar />);
    const image = screen.getByAltText("Avatar");
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain("about.png");
  });
});

describe("AvatarWithTablet", () => {
  it("renders the tablet avatar image", () => {
    render(<AvatarWithTablet />);
    const image = screen.getByAltText("Avatar with tablet");
    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toContain("avatar_with_tablet.png");
  });
});
