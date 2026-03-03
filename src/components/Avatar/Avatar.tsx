"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import Image from "next/image";

const Avatar = () => {
  return (
    <motion.div
      className="bottom-0 right-0 hidden md:inline-block md:absolute w-[400px] h-[400px]"
      variants={fadeIn("right", 0.5, 0.65)}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <Image
        src="/assets/about.webp"
        priority
        fill
        alt="Avatar"
        className="mx-auto md:block"
      />
    </motion.div>
  );
};

export default Avatar;
