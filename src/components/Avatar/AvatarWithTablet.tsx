"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import Image from "next/image";

const AvatarWithTablet = () => {
  return (
    <motion.div
      variants={fadeIn("right", 0.4, 0.9)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="bottom-0 left-0 hidden md:inline-block md:absolute"
    >
      <div className="p-2 hud shadow-glow">
        <Image
          src="/assets/avatar_with_tablet.png"
          width={300}
          height={300}
          priority
          alt="Avatar with tablet"
          className="border border-dim bg-panel"
        />
      </div>
    </motion.div>
  );
};

export default AvatarWithTablet;
