"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { useScrollRef } from "@/components/custom-hooks/ScrollProvider";
import AboutBanner from "@/components/landing-page/AboutBanner";
import { useTranslations } from "next-intl";
import CardEvent from "./CardEvent";

export default function Category() {
  const { ref, scrollToSection } = useScrollRef("category");
  const t = useTranslations("HomePage");

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full flex-col items-center justify-end gap-0 overflow-hidden bg-neutral-50 px-8 pb-[10vh] md:min-h-[1120px] md:px-12 lg:px-14"
    >
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
        <NextImage
          src="/landing-page/bg-banner-section.png"
          alt="Hero background"
          fill
          sizes="100vw"
          quality={100}
          priority
          className="inset-0 w-full object-cover"
          imgClassName="object-cover w-full h-full"
        />
      </div>

      {/* Decorative top-right background */}
      <div className="absolute right-0 top-0 z-10 h-auto">
        <NextImage
          src="/landing-page/tr-bg.png"
          alt="top right"
          width={1116}
          height={613}
          className="h-full w-full"
        />
      </div>

      {/* About Banner */}
      <div className="z-20 flex w-full items-center justify-center">
        <AboutBanner handleScroll={() => scrollToSection("dental-event")} />
      </div>

      {/* Content Section */}
      <div className="z-30 mt-6 flex h-full w-full flex-col items-center justify-center md:mt-8 lg:mt-10">
        {/* Title section */}
        <Typography
          variant="h1"
          font="Rubik"
          className="text-center text-[48px] leading-none text-black md:text-[64px] lg:text-left"
          weight="extrabold"
        >
          {t("category.title")}{" "}
          <span className="font-bagnard text-purple-600">
            {t("category.titleDifferentFont")}
          </span>
        </Typography>
        {/* Card section */}
        <div className="lg:gap-18 relative mt-10 flex h-full w-full flex-col items-center justify-center gap-12 md:gap-14 lg:flex-row lg:items-end">
          {/* OKGD Card */}
          <CardEvent
            src="/landing-page/bg-card-okgd.png"
            title="OKGD"
            subtitle="Olimpiade Kedokteran Gigi Dasar"
            urlLink="/okgd-event"
          />
          {/* UDSRC Card */}
          <CardEvent
            src="/landing-page/bg-card-udsrc.png"
            title="UDSRC"
            subtitle="UGM Dental Student Research Competition"
            urlLink="/udsrc-event"
          />
        </div>
      </div>
    </section>
  );
}
