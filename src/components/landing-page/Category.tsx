"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { useScrollRef } from "@/components/custom-hooks/ScrollProvider";
import AboutBanner from "@/components/landing-page/AboutBanner";
import CardEvent from "./CardEvent";
export default function Category() {
  const { ref, scrollToSection } = useScrollRef("category");
  return (
    <section
      ref={ref}
      className="bg-neutral-50 relative min-h-screen md:min-h-[1120px] w-full flex justify-end items-center flex-col pb-[10vh] overflow-hidden gap-0 px-8 md:px-12 lg:px-14"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <NextImage
          src="/landing-page/bg-banner-section.png"
          alt="Hero background"
          fill
          sizes="100vw"
          quality={100}
          priority
          className="object-cover inset-0 w-full"
          imgClassName="object-cover w-full h-full"
        />
      </div>

      {/* Decorative top-right background */}
      <div className="absolute top-0 right-0 h-auto z-10">
        <NextImage
          src="/landing-page/tr-bg.png"
          alt="top right"
          width={1116}
          height={613}
          className="w-full h-full"
        />
      </div>

      {/* About Banner */}
      <div className="w-full z-20 flex items-center justify-center">
        <AboutBanner handleScroll={() => scrollToSection("dental-event")} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-center justify-center w-full h-full z-30 mt-6 md:mt-8 lg:mt-10">
        {/* Title section */}
        <Typography
          variant="h1"
          font="Rubik"
          className="text-[48px] md:text-[64px] text-black text-center lg:text-left leading-none"
          weight="extrabold"
        >
          What's your{" "}
          <span className="font-bagnard text-purple-600">Category?</span>
        </Typography>
        {/* Card section */}
        <div className="h-full w-full mt-10 flex flex-col lg:flex-row justify-center items-center lg:items-end relative gap-12 md:gap-14 lg:gap-18">
          {/* OKGD Card */}
          <CardEvent
            src="/landing-page/bg-card-okgd.png"
            title="OKGD"
            subtitle="Olimpiade Kedokteran Gigi Dasar"
          />
          {/* UDSRC Card */}
          <CardEvent
            src="/landing-page/bg-card-udsrc.png"
            title="UDSRC"
            subtitle="UGM Dental Student Poster and Essay Competition"
          />
        </div>
      </div>
    </section>
  );
}
