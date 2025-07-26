"use client";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { HeroEventProps } from "@/types/event-page";
import { motion } from "motion/react";
import Link from "next/link";

export default function HeroEvent({
  title,
  subtitle,
  bgImage,
  urlRegist,
  buttonText,
  isButtonDisabled = false,
}: HeroEventProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <section className="relative h-screen w-screen bg-purple-700">
        {/* Hero Image background */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <NextImage
            src={bgImage}
            alt="Hero background"
            width={2560}
            height={600}
            priority
            className="absolute flex w-full items-center justify-center"
            imgClassName="w-screen lg:container object-cover h-screen"
            quality={100}
          />
        </motion.div>
        {/* Content container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container relative z-20 flex h-full flex-col justify-end pb-16 md:mx-auto md:px-6 md:pb-24"
        >
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 items-end gap-12 md:grid-cols-2"
          >
            <div className="flex flex-col">
              {/* Main heading */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  font="Bagnard"
                  weight="regular"
                  className="mb-4 text-center text-3xl font-bold leading-normal text-white min-[375px]:text-4xl md:text-left md:text-5xl md:leading-tight lg:text-7xl"
                >
                  {title}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="p"
                  font="Rubik"
                  weight="regular"
                  className="mb-8 w-full text-center text-lg text-white/90 md:max-w-md md:text-left md:text-xl lg:text-2xl"
                >
                  {subtitle}
                </Typography>
              </motion.div>
            </div>

            <div className="flex items-center justify-center md:items-end md:justify-end">
              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: isButtonDisabled ? 1 : 1.05 }}
                  whileTap={{ scale: isButtonDisabled ? 1 : 0.95 }}
                >
                  <Button
                    variant="gradient-yellow"
                    size="lg"
                    className={`px-4 py-2 text-xl md:text-2xl lg:px-12 lg:py-6 ${
                      isButtonDisabled
                        ? "pointer-events-none cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    disabled={isButtonDisabled}
                  >
                    <Link href={isButtonDisabled ? "#" : urlRegist}>
                      {isButtonDisabled ? "Pendaftaran Ditutup" : buttonText}
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
