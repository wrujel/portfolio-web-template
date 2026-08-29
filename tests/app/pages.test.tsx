import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contacts/page";
import CustomersPage from "@/app/customers/page";
import Home from "@/app/page";
import ProjectsPage from "@/app/projects/page";
import ServicesPage from "@/app/services/page";

vi.mock("framer-motion/dom", () => ({ scroll: vi.fn() }));

const usePathname = vi.hoisted(() => vi.fn(() => "/"));
vi.mock("next/navigation", () => ({ usePathname }));

/** Every route mounts the wipe transition ahead of its content. */
const expectTransition = (container: HTMLElement) => {
  expect(container.querySelectorAll("div.fixed.z-30")).toHaveLength(1);
};

describe("routes", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1440,
    });
  });

  it("/ renders the cover", () => {
    const { container } = render(<Home />);
    expectTransition(container);
    expect(container.querySelector("main")).toHaveClass("h-[100vh]");
    expect(screen.getByText("~/portfolio — zsh")).toBeInTheDocument();
  });

  it("/about renders the about section", () => {
    const { container } = render(<AboutPage />);
    expectTransition(container);
    expect(screen.getByText("> ABOUT_ME")).toBeInTheDocument();
  });

  it("/contacts renders the contact form", () => {
    const { container } = render(<ContactPage />);
    expectTransition(container);
    expect(screen.getByText("> SEND_MESSAGE")).toBeInTheDocument();
  });

  it("/customers renders the testimonials", () => {
    const { container } = render(<CustomersPage />);
    expectTransition(container);
    expect(screen.getByText("> TESTIMONIALS")).toBeInTheDocument();
  });

  it("/projects renders the project cards", () => {
    const { container } = render(<ProjectsPage />);
    expectTransition(container);
    expect(screen.getByText("> SELECTED_WORK")).toBeInTheDocument();
  });

  it("/services renders the service cards", () => {
    const { container } = render(<ServicesPage />);
    expectTransition(container);
    expect(screen.getByText("> WHAT_I_DO")).toBeInTheDocument();
  });

  it.each([
    ["/about", AboutPage],
    ["/contacts", ContactPage],
    ["/customers", CustomersPage],
    ["/projects", ProjectsPage],
    ["/services", ServicesPage],
  ])("%s fills at least the viewport height", (_path, Page) => {
    const { container } = render(<Page />);
    expect(container.firstElementChild).toHaveClass("min-h-screen");
  });
});
