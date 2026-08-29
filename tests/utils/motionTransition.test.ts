import { describe, expect, it } from "vitest";
import {
  fadeIn,
  motionTransitionAbout,
  transitionVariantsPage,
} from "@/utils/motionTransition";

describe("transitionVariantsPage", () => {
  it("wipes in from the right and back out again", () => {
    expect(transitionVariantsPage.initial).toEqual({ x: "100%", width: "100%" });
    expect(transitionVariantsPage.animate).toEqual({ x: "0%", width: "0%" });
    expect(transitionVariantsPage.exit).toEqual({
      x: ["0%", "100%"],
      width: ["0%", "100%"],
    });
  });
});

describe("motionTransitionAbout", () => {
  it("starts translated down and transparent, then settles", () => {
    expect(motionTransitionAbout.initial).toMatchObject({
      opacity: 0,
      transform: "translateY(60px)",
    });
    expect(motionTransitionAbout.animate).toMatchObject({
      opacity: 1,
      transform: "translateY(0px)",
    });
    expect(motionTransitionAbout.transition).toMatchObject({ type: "tween" });
  });
});

describe("fadeIn", () => {
  const hidden = (direction: string) =>
    fadeIn(direction, 0).hidden as Record<string, number>;

  it.each([
    ["up", { y: 40, x: 0 }],
    ["down", { y: -40, x: 0 }],
    ["left", { y: 0, x: 40 }],
    ["right", { y: 0, x: -40 }],
    ["none", { y: 0, x: 0 }],
  ])("offsets the hidden state for direction %s", (direction, offset) => {
    expect(hidden(direction)).toMatchObject(offset);
  });

  it("hides with zero opacity regardless of direction", () => {
    expect(hidden("up").opacity).toBe(0);
  });

  it("carries the delay into both variants", () => {
    const variants = fadeIn("up", 0.42);
    expect(variants.hidden).toMatchObject({
      transition: expect.objectContaining({ delay: 0.42 }),
    });
    expect(variants.show).toMatchObject({
      transition: expect.objectContaining({ delay: 0.42 }),
    });
  });

  it("shows at full opacity when none is given", () => {
    expect(fadeIn("up", 0).show).toMatchObject({ opacity: 1 });
  });

  it("honours an explicit opacity", () => {
    expect(fadeIn("left", 0.4, 0.9).show).toMatchObject({ opacity: 0.9 });
  });

  it("treats an explicit zero opacity as unset", () => {
    // `opacity || 1` means 0 falls through to the default; pin the behaviour so
    // a future change to `??` is a deliberate one.
    expect(fadeIn("left", 0.4, 0).show).toMatchObject({ opacity: 1 });
  });
});
