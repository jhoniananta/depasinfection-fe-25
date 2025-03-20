import "./globals.css";

import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";

import Providers from "@/app/providers";
import { NextIntlClientProvider } from "next-intl";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${rubik.variable} ${bagnard.variable}`}>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
