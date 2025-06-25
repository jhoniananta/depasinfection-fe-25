"use client";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { useScrollRef } from "@/components/custom-hooks/ScrollProvider";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export default function DentalEvent() {
  const { ref } = useScrollRef("dental-event");
  const t = useTranslations("HomePage");

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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white overflow-hidden flex items-center justify-center py-8 md:py-10"
      ref={ref}
    >
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-purple-700/90 z-0"
      ></motion.div>

      {/* Image background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <NextImage
          src="/landing-page/bg-event.png"
          alt="background"
          width={2560}
          height={600}
          priority
          className="w-full absolute flex justify-center items-center"
          imgClassName="w-screen object-cover h-screen 2xl:container"
          quality={100}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-7xl mx-auto container"
      >
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
          {/* Left side - Quote and description */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 space-y-4"
          >
            {/* Quote mark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-6xl md:text-8xl font-bold text-white/80"
            >
              "
            </motion.div>

            {/* Main text */}
            <motion.div
              variants={itemVariants}
              className="text-sm md:text-base space-y-4 text-justify"
            >
              <Typography variant="p" className="text-white">
                {t("dentalEvent.content")}
              </Typography>
            </motion.div>

            {/* Organizing committee */}
            <motion.div variants={itemVariants} className="pt-4">
              <h3 className="font-bold text-lg md:text-xl">
                {t("dentalEvent.boldContent")}
              </h3>
              <p>{t("dentalEvent.name")}</p>
            </motion.div>
          </motion.div>

          {/* Right side - Profile cards */}
          <motion.div
            variants={itemVariants}
            className="w-full h-auto lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Profile Card 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-b from-white/20 to-white/5 rounded-3xl overflow-hidden shadow-lg h-64 md:h-80 lg:h-[480px]"
            >
              <div className="absolute w-full h-64 md:h-80 lg:h-[480px]">
                <NextImage
                  src="/landing-page/aurelia-oc.png"
                  alt="Aurelia Picture"
                  sizes="100vw"
                  quality={100}
                  priority
                  fill
                  className="object-cover inset-0 w-full"
                  imgClassName="object-cover w-full h-full"
                />
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 lg:p-4 z-10 absolute bottom-0 left-0 right-0"
              >
                <Typography
                  variant="h2"
                  className="text-4xl md:text-5xl font-bold text-purple-500"
                >
                  Aurelia
                </Typography>
                <Typography
                  variant="p"
                  className="text-xl md:text-2xl text-purple-400"
                >
                  General OC
                </Typography>
              </motion.div>
            </motion.div>

            {/* Profile Card 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-b from-white/20 to-white/5 rounded-3xl overflow-hidden shadow-lg h-64 md:h-80 lg:h-[480px]"
            >
              <div className="absolute w-full h-64 md:h-80 lg:h-[480px]">
                <NextImage
                  src="/landing-page/hannani-koor.png"
                  alt="Committee member"
                  sizes="100vw"
                  quality={100}
                  priority
                  fill
                  className="object-cover inset-0 w-full"
                  imgClassName="object-cover w-full h-full"
                />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 lg:p-4 z-10 absolute bottom-0 left-0 right-0"
              >
                <Typography
                  variant="h2"
                  className="text-4xl md:text-5xl font-bold text-purple-500"
                >
                  Hannnani
                </Typography>
                <Typography
                  variant="p"
                  className="text-xl md:text-2xl text-purple-400"
                >
                  General Sub-Coor
                </Typography>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
