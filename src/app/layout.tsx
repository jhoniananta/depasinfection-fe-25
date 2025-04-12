import "./globals.css";

import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";

import Providers from "@/app/providers";
import { NextIntlClientProvider } from "next-intl";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const bagnard = localFont({
  src: "../fonts/Bagnard.otf",
  variable: "--font-bagnard",
});

export const metadata: Metadata = {
  title: {
    default:
      "Depa's Infection 2025 | Denta Paramitha's Science Festival and Competition",
    template: "%s | Depa's Infection 2025",
  },
  description:
    "Depa's Infection or Denta Paramitha's Science Festival and Competition is one of the biggest events held by Denta Paramitha. Denta Paramitha is an semi-autonomous body that oversees educational and research development from the Faculty of Dentistry, Universitas Gadjah Mada. Depa's Infection consists of 2 sub-events, namely National Dentistry Olympiad (OKGD) for Senior High School (SHS) students at the national level and University Dental School Research Competition (UDSRC) for undergraduate students at the international level. UDSRC has 2 branches; Poster Competition and 3 Minutes Oral Competition for pre-clinical (S-1) and clinical students from health-related fields such as dentistry, medicine, pharmacy, midwifery, nursing, and public health.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${rubik.variable} ${bagnard.variable} bg-neutral-50`}>
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
