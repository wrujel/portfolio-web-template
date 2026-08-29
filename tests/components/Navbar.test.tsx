import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Navbar from "@/components/Navbar/Navbar";
import { dataNavbar } from "@/components/Navbar/Navbar.data";

const usePathname = vi.hoisted(() => vi.fn<() => string>());
vi.mock("next/navigation", () => ({ usePathname }));

describe("Navbar", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
  });

  it("renders a link for every destination", () => {
    render(<Navbar />);
    for (const { name, path } of dataNavbar) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", path);
    }
  });

  it("highlights only the active route", () => {
    usePathname.mockReturnValue("/about");
    render(<Navbar />);

    const icon = (name: string) =>
      screen.getByRole("link", { name }).firstElementChild;

    expect(icon("about")).toHaveClass("border-neon");
    expect(icon("home")).toHaveClass("border-dim");
    expect(icon("home")).not.toHaveClass("border-neon");
  });

  it("labels the home tooltip with ~ and the rest with a relative path", () => {
    render(<Navbar />);
    expect(screen.getByText("$ cd ~")).toBeInTheDocument();
    expect(screen.getByText("$ cd ./about")).toBeInTheDocument();
  });
});

describe("Navbar.data", () => {
  it("exposes five uniquely-pathed entries", () => {
    expect(dataNavbar).toHaveLength(5);
    const paths = dataNavbar.map(({ path }) => path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const { icon } of dataNavbar) expect(icon).toBeTruthy();
  });
});
