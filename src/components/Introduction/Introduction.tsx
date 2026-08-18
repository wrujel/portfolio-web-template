"use client";

import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const marqueeWords = [
  "Imagine it",
  "Code it",
  "Ship it",
  "Break it",
  "Fix it",
  "Repeat",
];

const useTypewriter = (text: string, speed = 70, startDelay = 900) => {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOutput(text.slice(0, i));
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return output;
};

const Introduction = () => {
  const strip = [...marqueeWords, ...marqueeWords];
  const typed = useTypewriter("THEN CODE IT");

  return (
    <div className="relative flex flex-col w-full">
      <div className="container flex flex-col-reverse items-center justify-center flex-1 gap-10 px-5 pt-32 pb-24 mx-auto md:flex-row md:justify-center md:gap-14 lg:gap-20 md:pt-24 md:pr-28">
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full max-w-2xl hud shadow-glow"
        >
          {/* terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-dim">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 font-mono text-xs text-neon/50">
              ~/portfolio — zsh
            </span>
          </div>

          <div className="p-5 md:p-8">
            <p className="mb-4 font-mono text-sm">
              <span className="text-amber">$</span>{" "}
              <span className="text-neon/70">whoami</span>
            </p>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.9] text-neon [text-shadow:0_0_14px_rgba(0,255,102,0.5)]">
              IMAGINE IT,
              <br />
              {typed}
              <span className="animate-blink">█</span>
            </h1>
            <p className="max-w-md mt-6 text-sm leading-relaxed md:max-w-2xl md:text-base text-[#CFFFD9]/80">
              <span className="text-neon/50">{"// "}</span>
              Welcome to my digital realm! As a passionate web developer, I
              specialize in crafting innovative and responsive websites that
              blend functionality with aesthetics to elevate your online
              experience.
            </p>

            <div className="flex flex-col gap-4 mt-8 sm:flex-row">
              <a
                href="/projects"
                className="px-6 py-3 font-mono text-sm font-bold text-center uppercase transition-all duration-150 border border-neon text-neon w-fit hover:bg-neon hover:text-term hover:shadow-glow"
              >
                &gt; ./projects
              </a>
              <a
                href="/contacts"
                className="px-6 py-3 font-mono text-sm font-bold text-center uppercase transition-all duration-150 border border-amber text-amber w-fit hover:bg-amber hover:text-term hover:shadow-[0_0_12px_rgba(255,176,0,0.4)]"
              >
                &gt; ./contact
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("down", 0.45)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="relative"
        >
          <div className="p-2 hud shadow-glow">
            <Image
              src="/assets/avatar.png"
              priority
              width="300"
              height="300"
              alt="Avatar"
              className="h-auto border w-52 border-dim bg-panel md:w-60 lg:w-72"
            />
          </div>
          <span className="absolute px-3 py-1 font-mono text-xs font-bold uppercase border -top-3 -left-3 border-amber bg-panel text-amber shadow-[0_0_8px_rgba(255,176,0,0.4)]">
            Status: online
          </span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full py-2 overflow-hidden border-t border-dim bg-panel">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((half) => (
            <div
              key={half}
              className="flex items-center gap-8 pr-8 font-mono text-sm tracking-widest uppercase text-neon/80"
            >
              {strip.map((word, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span>{word}</span>
                  <span className="text-amber">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
