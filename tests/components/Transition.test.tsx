import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Transition from "@/components/Transition/Transition";

describe("Transition", () => {
  it("renders the two stacked wipe panels", () => {
    const { container } = render(<Transition />);
    const panels = container.querySelectorAll("div.fixed");
    expect(panels).toHaveLength(2);
    expect(panels[0]).toHaveClass("bg-panel");
    expect(panels[1]).toHaveClass("bg-term");
  });
});
