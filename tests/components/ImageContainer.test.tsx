import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImageContainer from "@/components/ImageContainer/ImageContainer";

const setup = () =>
  render(<ImageContainer image="/assets/review-1.jpg" name="Emily Clark" />);

describe("ImageContainer", () => {
  it("shows the placeholder until the image reports it has loaded", async () => {
    const { container } = setup();
    expect(container.querySelector(".animate-pulse")).not.toBeNull();

    // next/image defers onLoad behind img.decode(), so the flag flips a
    // microtask later rather than synchronously with the event.
    fireEvent.load(screen.getByAltText("Emily Clark"));
    await waitFor(() =>
      expect(container.querySelector(".animate-pulse")).toBeNull(),
    );
  });

  it("labels the image with the reviewer name", () => {
    setup();
    const image = screen.getByAltText("Emily Clark");
    expect(image.getAttribute("src")).toContain("review-1.jpg");
  });
});
