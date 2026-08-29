import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const stub = (name: string) =>
  fileURLToPath(new URL(`./tests/stubs/${name}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Resolves the "@/*" -> "src/*" mapping straight from tsconfig.json.
    tsconfigPaths: true,
    alias: {
      // next/font is a build-time SWC transform; outside `next build` the real
      // module throws, so the loaders are swapped for inert stand-ins.
      "next/font/google": stub("next-font-google.ts"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    clearMocks: true,
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["text", "text-summary", "lcov", "json-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.d.ts"],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
