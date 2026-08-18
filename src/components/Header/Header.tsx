"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import Link from "next/link";
import { socialNetworks } from "./Header.data";

const Header = () => {
  return (
    <header className="absolute z-20 inline-block w-full top-4 md:top-6">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        <div className="container flex flex-col items-center justify-between gap-4 px-4 mx-auto md:flex-row">
          <Link href="/" aria-label="Home">
            <h1 className="font-mono text-xl font-bold tracking-widest uppercase md:text-2xl">
              <span className="text-amber">$</span>{" "}
              <span className="text-neon [text-shadow:0_0_8px_rgba(0,255,102,0.6)] animate-flicker">
                ~/CODE_DEV
              </span>
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            {socialNetworks.map(({ logo, src }) => (
              <Link
                href={src}
                key={src}
                target="_blank"
                className="flex items-center justify-center w-10 h-10 transition-all duration-150 border border-dim bg-panel hover:border-neon hover:text-neon hover:shadow-glow-sm [&>svg]:h-5 [&>svg]:w-5"
              >
                {logo}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
