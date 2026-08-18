"use client";

import Avatar from "../Avatar/Avatar";
import { motion } from "framer-motion";
import { motionTransitionAbout } from "@/utils/motionTransition";
import { categories, about } from "./About.data";
import CountUp from "react-countup";
import { useState } from "react";
import { BiDownArrow, BiRightArrow } from "react-icons/bi";

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="items-center min-h-screen px-6 mx-auto align-middle mt-44 md:mt-0 md:flex md:max-w-4xl pb-36 md:pb-0">
      <Avatar />

      <motion.div
        initial={motionTransitionAbout.initial}
        animate={motionTransitionAbout.animate}
        transition={motionTransitionAbout.transition}
      >
        <p className="inline-block px-3 py-1 mb-4 font-mono text-xs tracking-widest uppercase border border-dim bg-panel text-neon">
          &gt; ABOUT_ME
        </p>
        <h1 className="mb-6 font-display text-5xl md:text-6xl leading-[0.9] text-neon [text-shadow:0_0_12px_rgba(0,255,102,0.45)]">
          CREATING WEBS WITH <br />
          <span className="text-amber [text-shadow:0_0_12px_rgba(255,176,0,0.45)]">
            [AWESOME DESIGNS]
          </span>
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed md:text-base text-[#CFFFD9]/80">
          <span className="text-neon/50">{"// "}</span>
          Hello! I&apos;m a passionate web developer with a flair for creating
          elegant and efficient websites. My expertise lies in front-end
          development, UX design, and bringing digital concepts to life with
          clean, functional code.
        </p>
        <br />
        <p className="max-w-2xl text-sm leading-relaxed md:text-base text-[#CFFFD9]/80">
          <span className="text-neon/50">{"// "}</span>
          Dedicated to continuous learning, I stay ahead in technology trends,
          ensuring each project I undertake benefits from the latest
          advancements in web development. My goal is to deliver user-centric,
          responsive designs that make a lasting impact.
        </p>

        <div className="grid grid-cols-2 gap-4 my-8 md:grid-cols-4 md:gap-5">
          {categories.map(({ id, counter, text }) => (
            <div key={id} className="p-4 hud">
              <p className="flex mb-1 font-mono text-3xl font-bold md:text-4xl text-neon [text-shadow:0_0_8px_rgba(0,255,102,0.5)]">
                +<CountUp end={counter} start={0} duration={5} />
              </p>
              <p className="font-mono text-xs uppercase text-neon/60">{text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-10 mb-3 md:flex-row md:gap-4 md:mt-16 md:mb-5">
          {about.map(({ id, text }) => {
            const active = index === id;
            return (
              <div
                key={id}
                className={`${
                  active
                    ? "border-neon text-neon shadow-glow-sm"
                    : "border-dim hover:border-neon hover:text-neon"
                } cursor-pointer md:text-lg relative px-4 md:px-6 py-3 border bg-panel flex justify-between items-center gap-4 my-2 md:my-0 font-mono uppercase text-sm transition-all duration-150`}
                onClick={() => setIndex(id)}
              >
                {active ? <BiDownArrow /> : <BiRightArrow />}
                <p className="ml-2">
                  [{active ? "*" : " "}] {text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="max-w-4xl p-4 mx-auto hud shadow-glow-sm">
          {about[index].items.map((items, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between max-w-md gap-4 py-2 mx-auto border-b border-dashed last:border-b-0 border-dim"
              >
                <span className="font-mono text-sm">
                  <span className="text-amber">&gt; </span>
                  {items.tittle}
                </span>
                <span className="px-2 py-0.5 font-mono text-xs border border-amber text-amber">
                  {items.date}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
