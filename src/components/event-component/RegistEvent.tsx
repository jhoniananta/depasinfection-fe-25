"use client";
import Countdown from "@/components/Countdown";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { RegistEventProps } from "@/types/event-page";
import { motion } from "motion/react";
import Link from "next/link";

export default function RegistEvent({
  srcVideo,
  endDate,
  guidebookUrl,
  registUrl,
}: RegistEventProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative min-h-full w-full"
    >
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute inset-0 z-0 h-full w-full"
      >
        <NextImage
          src="/landing-page/bg-banner-section.png"
          alt="Hero background"
          fill
          sizes="100vw"
          quality={100}
          priority
          className="inset-0 w-full object-cover"
          imgClassName="object-cover w-full h-full opacity-60 pointer-events-none select-none"
        />
      </motion.div>
      <div className="mx-auto my-[5vh] flex min-h-screen w-full flex-col items-center justify-center gap-[5vw] lg:container lg:flex-row lg:gap-[8vw]">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="z-10 md:w-1/2"
        >
          <iframe
            src={srcVideo}
            allow="autoplay"
            allowFullScreen
            className="h-[320px] w-full overflow-hidden rounded-xl shadow-lg md:h-[400px]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="container z-10 flex flex-col items-center justify-center gap-4 md:w-1/2 md:gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              weight="bold"
              className="text-balance text-center text-5xl text-black"
            >
              Registration Close In
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Countdown endDate={endDate} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="item-center mt-[2vw] flex w-full flex-col justify-center gap-2 p-4 min-[374px]:p-0 md:flex-row md:justify-between"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outlineSecondary">
                <Link href={guidebookUrl} target="_blank">
                  Guidebook
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" disabled>
                <Link href={registUrl}>Regist Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
