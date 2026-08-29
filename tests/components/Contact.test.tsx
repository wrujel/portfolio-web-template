import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Contact from "@/components/Contact/Contact";

describe("Contact", () => {
  it("renders the three required message fields", () => {
    const { container } = render(<Contact />);
    for (const name of ["name", "email", "message"]) {
      const field = container.querySelector(`[name="${name}"]`);
      expect(field, `missing field ${name}`).not.toBeNull();
      expect(field).toBeRequired();
    }
    expect(container.querySelector('[name="email"]')).toHaveAttribute(
      "type",
      "email",
    );
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    const { container } = render(<Contact />);
    const name = container.querySelector<HTMLInputElement>('[name="name"]')!;

    await user.type(name, "Ada");
    expect(name).toHaveValue("Ada");
  });

  it("exposes a submit button", () => {
    render(<Contact />);
    expect(screen.getByRole("button", { name: /execute/i })).toHaveAttribute(
      "type",
      "submit",
    );
  });
});
