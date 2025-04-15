import "./globals.css";

import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";
import { Rubik } from "next/font/google";
import localFont from "next/font/local";

import Providers from "@/app/providers";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";

const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });
const bagnard = localFont({
  src: "../fonts/Bagnard.otf",
  variable: "--font-bagnard",
});

const APP_NAME = "Depa's Infection 2025";
const APP_DEFAULT_TITLE = "Depa's Infection 2025";
const APP_TITLE_TEMPLATE = "%s - Depa's Infection 2025";
const APP_DESCRIPTION =
  "Depa's Infection or Denta Paramitha's Science Festival and Competition is one of the biggest events held by Denta Paramitha. Denta Paramitha is an semi-autonomous body that oversees educational and research development from the Faculty of Dentistry, Universitas Gadjah Mada. Depa's Infection consists of 2 sub-events, namely National Dentistry Olympiad (OKGD) for Senior High School (SHS) students at the national level and University Dental School Research Competition (UDSRC) for undergraduate students at the international level. UDSRC has 2 branches; Poster Competition and 3 Minutes Oral Competition for pre-clinical (S-1) and clinical students from health-related fields such as dentistry, medicine, pharmacy, midwifery, nursing, and public health.";
const APP_URL = "https://depasinfection.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/favicon/favicon.ico",
    shortcut: "/images/favicon/favicon-16x16.png",
    apple: "/images/favicon/apple-touch-icon.png",
  },
  openGraph: {
    url: APP_URL,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [`${APP_URL}/images/og/og-long.png`],
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/images/og/og-square.png`],
  },
  authors: [
    {
      name: APP_NAME,
      url: APP_URL,
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html suppressHydrationWarning lang={locale} className="scroll-smooth">
      <body className={`${rubik.variable} ${bagnard.variable} bg-neutral-50`}>
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="beforeInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W4LFDH7X');
        `}
        </Script>

        {/* Umami Analytics */}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="f76a925c-deee-4803-9710-fd301586681d"
          strategy="afterInteractive"
        />

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W4LFDH7X" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
