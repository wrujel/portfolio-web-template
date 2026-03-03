"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import Image from "next/image";

const AvatarWithTablet = () => {
  return (
    <motion.div
      variants={fadeIn("left", 0.5, 0.65)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="bottom-0 left-0 hidden md:inline-block md:absolute -z-10"
    >
      <Image
        src="/assets/avatar_with_tablet.webp"
        width={400}
        height={400}
        priority
        alt="Avatar with tablet"
        className="h-full w-full"
      />
    </motion.div>
  );
};

export default AvatarWithTablet;
