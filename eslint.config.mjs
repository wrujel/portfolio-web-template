import next from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "coverage/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...next,
];

export default eslintConfig;
