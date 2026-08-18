"use client";

import { motion } from "framer-motion";
import AvatarWithTablet from "../Avatar/AvatarWithTablet";
import { fadeIn } from "@/utils/motionTransition";
import Slider from "./Slider/Slider";

const Customers = () => {
  return (
    <div className="h-screen min-w-[320px]">
      <AvatarWithTablet />
      <div className="flex flex-col justify-center min-h-screen mt-10 md:mt-0">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="my-5 text-center md:my-8"
        >
          <p className="inline-block px-3 py-1 mb-4 font-mono text-xs tracking-widest uppercase border border-dim bg-panel text-neon">
            &gt; TESTIMONIALS
          </p>
          <h1 className="font-display text-5xl leading-[0.9] md:text-6xl text-neon [text-shadow:0_0_12px_rgba(0,255,102,0.45)]">
            REVIEWS FROM <br />
            <span className="text-amber [text-shadow:0_0_12px_rgba(255,176,0,0.45)]">
              [OUR CUSTOMERS]
            </span>
          </h1>
        </motion.div>
        <motion.div
          variants={fadeIn("up", 0.35)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex justify-center"
        >
          <Slider />
        </motion.div>
      </div>
    </div>
  );
};

export default Customers;
