import "./globals.css";

import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";

import Providers from "@/app/providers";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const bagnard = localFont({
  src: "../fonts/Bagnard.otf",
  variable: "--font-bagnard",
});

export const metadata: Metadata = {
  title: {
    default: "Depass Infection",
    template: "%s | Nextjs Starter Template",
  },
  description: "Depass Infection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${bagnard.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
