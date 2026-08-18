"use client";
import { fadeIn } from "@/utils/motionTransition";
import { motion } from "framer-motion";
import { dataNavbar } from "./Navbar.data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  return (
    <motion.div
      className="fixed bottom-0 z-20 flex flex-col items-center w-full mt-auto md:justify-center h-max md:top-1/4 md:right-10 md:w-16 md:max-w-md md:h-screen"
      variants={fadeIn("left", 0.3)}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <div className="flex items-center justify-between w-full px-3 py-3 border border-dim bg-panel md:flex-col md:justify-center md:gap-y-5 md:px-3 md:py-6 md:h-max">
        {dataNavbar.map(({ name, path, icon }) => {
          const active = path === pathName;
          return (
            <div key={name}>
              <Link
                href={path}
                aria-label={name}
                className="relative flex items-center justify-center group"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center border transition-all duration-150 [&>svg]:h-5 [&>svg]:w-5 ${
                    active
                      ? "border-neon text-neon shadow-glow-sm"
                      : "border-dim hover:border-neon hover:text-neon hover:shadow-glow-sm"
                  }`}
                >
                  {icon}
                </span>
                <span className="absolute hidden px-2 py-1 font-mono text-xs whitespace-nowrap border border-neon bg-panel text-neon shadow-glow-sm right-full mr-4 md:group-hover:block">
                  $ cd {path === "/" ? "~" : `.${path}`}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Navbar;
