import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Services from "@/components/Services/Services";
import { sliderData } from "@/components/Services/Slider/Slider.data";

describe("Services", () => {
  it("renders a card per service", () => {
    render(<Services />);
    for (const { title, description } of sliderData) {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  });

  it("numbers the cards from 01, zero-padded", () => {
    render(<Services />);
    expect(screen.getByText("#01")).toBeInTheDocument();
    expect(
      screen.getByText(`#${String(sliderData.length).padStart(2, "0")}`),
    ).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<Services />);
    expect(screen.getByText("[SERVICES]")).toBeInTheDocument();
  });
});

describe("Services Slider.data", () => {
  it("gives every service an icon, title and description", () => {
    expect(sliderData).toHaveLength(7);
    for (const { icon, title, description } of sliderData) {
      expect(icon).toBeTruthy();
      expect(title).not.toHaveLength(0);
      expect(description).not.toHaveLength(0);
    }
  });
});
