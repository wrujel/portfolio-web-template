import type { Metadata } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header/Header";
import DotGrid from "@/components/ui/DotGrid";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const display = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "CodeDev — Web Developer Portfolio",
  description:
    "Portfolio of a web developer crafting innovative, responsive websites that blend functionality with aesthetics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${mono.variable} ${display.variable} bg-term font-mono text-[#CFFFD9]`}
      >
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <DotGrid
            dotSize={3}
            gap={30}
            baseColor="#14301C"
            activeColor="#00FF66"
            proximity={120}
            shockRadius={200}
            shockStrength={3}
          />
        </div>
        <Navbar />
        <Header />
        {children}
      </body>
    </html>
  );
}
