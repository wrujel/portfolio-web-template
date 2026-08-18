import type { Target, Transition, Variants } from "framer-motion";

export const transitionVariantsPage: Variants = {
  initial: {
    x: "100%",
    width: "100%",
  },
  animate: {
    x: "0%",
    width: "0%",
  },
  exit: {
    x: ["0%", "100%"],
    width: ["0%", "100%"],
  },
};

export const motionTransitionAbout: {
  initial: Target;
  transition: Transition;
  animate: Target;
} = {
  initial: {
    opacity: 0,
    bottom: "2rem",
    transform: "translateY(60px)",
  },
  transition: {
    duration: 0.8,
    type: "tween",
    ease: [0.22, 1, 0.36, 1],
  },
  animate: {
    opacity: 1,
    transform: "translateY(0px)",
  },
};

export const fadeIn = (
  direction: string,
  delay: number,
  opacity?: number
): Variants => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      opacity: 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      transition: {
        type: "tween",
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: opacity || 1,
      transition: {
        type: "tween",
        duration: 0.55,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};
