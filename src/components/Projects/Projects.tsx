"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import { scroll } from "framer-motion/dom";
import { cardContent } from "./Projects.data";
import { useState } from "react";

const Projects = () => {
  const [index, setIndex] = useState<number | null>(0);
  let width: number | null = null;

  if (typeof window !== "undefined") {
    width = window.innerWidth;
  }

  const isMobile = () => {
    return width ? width < 768 : false;
  };

  if (isMobile()) {
    scroll((progress: number) => {
      if (progress < 0.2) setIndex(0);
      else if (progress > 0.2 && progress < 0.4) setIndex(1);
      else if (progress > 0.4 && progress < 0.6) setIndex(2);
      else if (progress > 0.6 && progress < 0.8) setIndex(3);
      else if (progress > 0.8) setIndex(4);
    });
  }

  const handleHover = (id: number) => {
    if (!isMobile()) setIndex(id);
  };

  const cardVariants = {
    expanded: {
      width: isMobile() ? "75svw" : "360px",
      opacity: 1,
    },
    collapsed: {
      width: "200px",
      opacity: 0.55,
    },
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-w-min gap-10 pb-32 md:min-h-screen mt-36 md:mt-0 place-items-center">
        <div className="mx-4 md:mr-48 xl:mx-4">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="my-5 text-center"
          >
            <p className="inline-block px-3 py-1 mb-4 font-mono text-xs tracking-widest uppercase border border-dim bg-panel text-neon">
              &gt; SELECTED_WORK
            </p>
            <h1 className="font-display text-5xl leading-[0.9] md:text-6xl text-neon [text-shadow:0_0_12px_rgba(0,255,102,0.45)]">
              MY LATEST{" "}
              <span className="text-amber [text-shadow:0_0_12px_rgba(255,176,0,0.45)]">
                [PROJECTS]
              </span>
            </h1>
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.35)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col items-center h-full gap-5 px-2 md:flex-row"
          >
            {cardContent.map(({ id, title, description, imageUrl, skills }) => (
              <div key={id}>
                <motion.div
                  className={`cursor-pointer h-[75svh] md:h-[600px] lg:h-[750px] bg-cover bg-center bg-no-repeat border relative bg-panel ${
                    index === id
                      ? "border-neon shadow-glow"
                      : "border-dim"
                  }`}
                  initial={{ opacity: 1 }}
                  variants={cardVariants}
                  animate={id === index ? "expanded" : "collapsed"}
                  exit={{
                    opacity: 1,
                  }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => handleHover(id)}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                >
                  <span className="absolute px-2 py-1 font-mono text-xs border top-2 left-2 border-neon bg-panel text-neon shadow-glow-sm">
                    [P_{String(id + 1).padStart(2, "0")}]
                  </span>
                  <div className="flex flex-col justify-end h-full">
                    <div className="bg-panel border-t border-dim min-h-[100px] flex flex-col items-center justify-center px-3 pt-4 pb-5">
                      <h2 className="font-mono text-xl font-bold tracking-widest text-center uppercase text-neon">
                        {title}
                      </h2>
                      {id === index && (
                        <motion.div
                          initial={{ display: "none", opacity: 0, scale: 0.2 }}
                          animate={{ display: "block", opacity: 1, scale: 0.9 }}
                          transition={{
                            duration: 0.15,
                            delay: 0.15,
                          }}
                        >
                          <p className="mt-1 text-sm text-center text-[#CFFFD9]/80">
                            {description}
                          </p>
                          <div className="flex flex-wrap justify-center gap-2 mt-3">
                            {skills.map((data, index) => (
                              <span
                                key={index}
                                className="flex items-center justify-center transition-colors duration-150 border w-9 h-9 border-dim bg-term hover:border-neon hover:text-neon [&>svg]:h-5 [&>svg]:w-5"
                              >
                                {data.icon}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <motion.div
        variants={fadeIn("left", 0.5)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="absolute hidden px-3 py-1 font-mono text-xs uppercase border right-16 bottom-6 md:inline-block border-dim bg-panel text-neon/70"
      >
        {"//"} made with ❤ by CodeDev
      </motion.div>
    </>
  );
};

export default Projects;
