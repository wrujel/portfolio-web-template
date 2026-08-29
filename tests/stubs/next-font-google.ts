/**
 * Stand-in for `next/font/google`. The real module is a build-time SWC
 * transform and throws when called from a plain bundler, so tests get loaders
 * that return the same shape next/font produces at runtime.
 */
interface FontResult {
  className: string;
  variable: string;
  style: { fontFamily: string };
}

const loader =
  (family: string) =>
  ({ variable }: { variable?: string } = {}): FontResult => ({
    className: `__${family}`,
    variable: variable ?? `--font-${family.toLowerCase()}`,
    style: { fontFamily: family },
  });

export const JetBrains_Mono = loader("JetBrains_Mono");
export const VT323 = loader("VT323");
