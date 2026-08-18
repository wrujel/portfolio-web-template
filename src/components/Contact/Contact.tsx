"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="w-full justify-center items-center min-h-screen px-6 mx-auto align-middle mt-40 md:mt-0 md:flex md:max-w-4xl pb-36 md:pb-0 gap-6">
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="md:w-[40vw] flex justify-center items-center"
      >
        <div>
          <p className="inline-block px-3 py-1 mb-6 font-mono text-xs tracking-widest uppercase border border-dim bg-panel text-neon">
            &gt; CONTACT
          </p>
          <h1 className="mb-6 font-display text-5xl md:text-6xl leading-[0.9] text-center md:text-left text-neon [text-shadow:0_0_12px_rgba(0,255,102,0.45)]">
            LET&apos;S CHAT. <br />
            <span className="text-amber [text-shadow:0_0_12px_rgba(255,176,0,0.45)]">
              [TELL ME ABOUT
            </span>{" "}
            <br />
            <span className="text-amber [text-shadow:0_0_12px_rgba(255,176,0,0.45)]">
              YOUR PROJECT.]
            </span>
          </h1>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.3)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="md:w-[40vw] flex justify-center items-center"
      >
        <div className="w-full max-w-md p-4 hud shadow-glow sm:p-6 md:p-8">
          <form className="space-y-5">
            <h5 className="font-mono text-xl font-bold tracking-widest uppercase text-neon">
              &gt; SEND_MESSAGE
            </h5>
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-mono text-xs tracking-widest uppercase text-neon/70"
              >
                &gt; NAME:
              </label>
              <input
                type="text"
                name="name"
                className="block w-full p-2.5 font-mono text-sm border border-dim bg-term text-[#CFFFD9] placeholder-[#CFFFD9]/30 caret-neon focus:outline-none focus:border-neon focus:shadow-glow-sm transition-all"
                placeholder="Full name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-mono text-xs tracking-widest uppercase text-neon/70"
              >
                &gt; EMAIL:
              </label>
              <input
                type="email"
                name="email"
                className="block w-full p-2.5 font-mono text-sm border border-dim bg-term text-[#CFFFD9] placeholder-[#CFFFD9]/30 caret-neon focus:outline-none focus:border-neon focus:shadow-glow-sm transition-all"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-mono text-xs tracking-widest uppercase text-neon/70"
              >
                &gt; PROJECT_DETAILS:*
              </label>
              <textarea
                name="message"
                className="h-[130px] w-full p-2.5 font-mono text-sm border border-dim bg-term text-[#CFFFD9] placeholder-[#CFFFD9]/30 caret-neon focus:outline-none focus:border-neon focus:shadow-glow-sm transition-all"
                placeholder="Your message"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 font-mono text-sm font-bold uppercase transition-all duration-150 border border-neon text-neon hover:bg-neon hover:text-term hover:shadow-glow"
            >
              &gt; EXECUTE
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
