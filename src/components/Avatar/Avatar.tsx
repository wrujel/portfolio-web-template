"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import Image from "next/image";

const Avatar = () => {
  return (
    <motion.div
      className="bottom-0 right-0 hidden md:inline-block md:absolute w-[340px] h-[340px]"
      variants={fadeIn("left", 0.4, 0.9)}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <div className="relative w-full h-full p-2 hud shadow-glow">
        <div className="relative w-full h-full border border-dim bg-panel">
          <Image
            src="/assets/about.png"
            priority
            fill
            alt="Avatar"
            className="object-contain p-2"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Avatar;
