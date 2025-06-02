"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { useScrollRef } from "@/components/custom-hooks/ScrollProvider";
import AboutBanner from "@/components/landing-page/AboutBanner";
import { motion } from "motion/react";
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 h-full w-full"
      >
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
      </motion.div>

      {/* Decorative top-right background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute right-0 top-0 z-10 h-auto"
      >
        <NextImage
          src="/landing-page/tr-bg.png"
          alt="top right"
          width={1116}
          height={613}
          className="h-full w-full"
        />
      </motion.div>

      {/* About Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="z-20 flex w-full items-center justify-center"
      >
        <AboutBanner handleScroll={() => scrollToSection("dental-event")} />
      </motion.div>

      {/* Content Section */}
      <div className="z-30 mt-6 flex h-full w-full flex-col items-center justify-center md:mt-8 lg:mt-10">
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
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
        </motion.div>

        {/* Card section */}
        <div className="lg:gap-18 relative mt-10 flex h-full w-full flex-col items-center justify-center gap-12 md:gap-14 lg:flex-row lg:items-end">
          {/* OKGD Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-auto"
          >
            <CardEvent
              src="/landing-page/bg-card-okgd.png"
              title="OKGD"
              subtitle="Olimpiade Kedokteran Gigi Dasar"
              urlLink="/okgd-event"
            />
          </motion.div>

          {/* UDSRC Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-auto"
          >
            <CardEvent
              src="/landing-page/bg-card-udsrc.png"
              title="UDSRC"
              subtitle="UGM Dental Scientific Research Competition"
              urlLink="/udsrc-event"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
