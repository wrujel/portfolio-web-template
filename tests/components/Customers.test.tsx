import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Customers from "@/components/Customers/Customers";
import Slider from "@/components/Customers/Slider/Slider";
import { reviewsData } from "@/components/Customers/Slider/Slider.data";

describe("Customers", () => {
  it("renders the testimonials heading above the slider", () => {
    const { container } = render(<Customers />);
    expect(screen.getByText("[OUR CUSTOMERS]")).toBeInTheDocument();
    expect(container.querySelector(".reviews-pagination")).not.toBeNull();
  });

  it("shows the tablet avatar alongside the reviews", () => {
    render(<Customers />);
    expect(screen.getByAltText("Avatar with tablet")).toBeInTheDocument();
  });
});

describe("Customers Slider", () => {
  it("renders a slide per review", () => {
    const { container } = render(<Slider />);
    expect(container.querySelectorAll(".swiper-slide")).toHaveLength(
      reviewsData.length,
    );
  });

  it("shows each reviewer with their quote and portrait", () => {
    render(<Slider />);
    for (const { name, review } of reviewsData) {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(review)).toBeInTheDocument();
      expect(screen.getByAltText(name)).toBeInTheDocument();
    }
  });

  it("routes pagination into the external bullet container", () => {
    const { container } = render(<Slider />);
    expect(container.querySelector(".reviews-pagination")).not.toBeNull();
  });
});

describe("Customers Slider.data", () => {
  it("gives every review a unique id and an image path", () => {
    expect(reviewsData).toHaveLength(5);
    const ids = reviewsData.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { image } of reviewsData) {
      expect(image).toMatch(/^\/assets\//);
    }
  });
});
