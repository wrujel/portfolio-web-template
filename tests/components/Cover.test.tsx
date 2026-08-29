import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Cover from "@/components/Cover/Cover";

describe("Cover", () => {
  it("wraps the introduction in a full-height shell", () => {
    const { container } = render(<Cover />);
    expect(container.firstElementChild).toHaveClass("min-h-screen");
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
