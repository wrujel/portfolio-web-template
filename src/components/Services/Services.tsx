"use client";

import { motion } from "framer-motion";

import AvatarWithTablet from "../Avatar/AvatarWithTablet";
import { fadeIn } from "@/utils/motionTransition";
import { sliderData } from "./Slider/Slider.data";

const Services = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-32 md:py-0">
      <AvatarWithTablet />

      <div className="w-full max-w-6xl md:pr-16">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="mb-8 text-center md:text-left"
        >
          <p className="inline-block px-3 py-1 mb-4 font-mono text-xs tracking-widest uppercase border border-dim bg-panel text-neon">
            &gt; WHAT_I_DO
          </p>
          <h1 className="font-display text-5xl leading-[0.9] md:text-6xl text-neon [text-shadow:0_0_12px_rgba(0,255,102,0.45)]">
            MY{" "}
            <span className="text-amber [text-shadow:0_0_12px_rgba(255,176,0,0.45)]">
              [SERVICES]
            </span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-sm leading-relaxed md:mx-0 md:text-base text-[#CFFFD9]/80">
            <span className="text-neon/50">{"// "}</span>
            Offering a suite of web development services: bespoke website
            design, responsive development, e-commerce solutions, content
            management systems, SEO optimization, and ongoing website
            maintenance to ensure seamless digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sliderData.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn("up", 0.25 + i * 0.07)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="p-4 transition-all duration-150 hud group hover:border-neon hover:shadow-glow"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center justify-center w-12 h-12 text-2xl transition-all duration-150 border border-dim text-neon group-hover:border-neon group-hover:shadow-glow-sm">
                  {item.icon}
                </span>
                <span className="font-mono text-sm text-neon/40">
                  #{String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-3 font-mono text-base font-bold uppercase transition-colors duration-150 group-hover:text-neon">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-[#CFFFD9]/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
