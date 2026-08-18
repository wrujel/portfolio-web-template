"use client";

import { transitionVariantsPage } from "@/utils/motionTransition";
import { AnimatePresence, motion } from "framer-motion";

const Transition = () => {
  return (
    <>
      <AnimatePresence mode="wait">
        <div>
          <motion.div
            className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-panel border-l-2 border-neon"
            variants={transitionVariantsPage}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          ></motion.div>
          <motion.div
            className="fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-term"
            variants={transitionVariantsPage}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          ></motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Transition;
