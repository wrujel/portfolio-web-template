"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import Image from "next/image";

const Introduction = () => {
  return (
    <div className="bg-[#131424]/60 w-full z-10">
      <div className="w-full h-full ">
        <div className="container flex justify-center items-center h-full mx-auto md:grid-cols-2 md:text-left px-5 md:pl-5 md:pr-20">
          <motion.div
            className="hidden w-auto h-auto mx-auto md:block"
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <Image
              src="/assets/avatar.webp"
              priority
              width="800"
              height="600"
              alt="Avatar"
            />
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <h1 className="text-center md:text-left mb-5 text-4xl leading-tight md:mb-10 font-medium">
              Imagine it, <br />
              <span className="text-secondary">then code it</span>
            </h1>
            <p className="text-center md:text-left max-w-sm text-xl md:max-w-2xl md:mx-0 md:text-xl">
              Welcome to my digital realm! As a passionate web developer, I
              specialize in crafting innovative and responsive websites that
              blend functionality with aesthetics to elevate your online
              experience.
            </p>

            <div className="flex flex-col items-center gap-3 md:gap-10 md:flex-row mt-10">
              <a
                href="/projects"
                className="px-6 py-3 my-2 transition-all border-2 cursor-pointer w-fit rounded-xl hover:shadow-xl hover:shadow-white/50"
              >
                Projects
              </a>
              <a
                href="/contacts"
                className="px-6 py-3 my-2 transition-all border-2 cursor-pointer text-secondary border-secondary rounded-xl hover:shadow-xl hover:shadow-secondary"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
