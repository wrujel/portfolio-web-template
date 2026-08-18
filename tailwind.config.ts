import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        term: "#070B07",
        panel: "#0C120C",
        neon: "#00FF66",
        amber: "#FFB000",
        dim: "#14301C",
        // legacy alias so leftover `secondary` classes map to neon
        secondary: "#00FF66",
        transparent: "transparent",
        current: "currentColor",
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 6px rgba(0, 255, 102, 0.45)",
        glow: "0 0 12px rgba(0, 255, 102, 0.35)",
        "glow-lg": "0 0 24px rgba(0, 255, 102, 0.3)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.6" },
          "43%": { opacity: "1" },
          "78%": { opacity: "1" },
          "79%": { opacity: "0.7" },
          "80%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        blink: "blink 1s step-end infinite",
        flicker: "flicker 4s linear infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
