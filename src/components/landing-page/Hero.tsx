"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { useScrollRef } from "@/components/custom-hooks/ScrollProvider";
import { motion } from "motion/react";
import Button from "../buttons/Button";

export default function Hero() {
  const { scrollToSection } = useScrollRef("hero");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
    <>
      <section className="relative w-screen h-screen bg-purple-700">
        {/* Hero Image background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <NextImage
            src="/landing-page/bg-hero.png"
            alt="Hero background"
            width={2560}
            height={600}
            priority
            className="w-full absolute flex justify-center items-center"
            imgClassName="w-screen lg:container object-cover h-screen "
            quality={100}
          />
        </motion.div>

        {/* Decorative right gold */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute right-0 bottom-0 opacity-80 z-10"
        >
          <NextImage
            src="/landing-page/decorative-gold.png"
            alt="decorative gold"
            width={1116}
            height={613}
            className="w-full h-full"
          />
        </motion.div>

        {/* Content container */}
        <div className="container relative z-20 md:mx-auto md:px-6 h-full flex flex-col justify-end pb-16 md:pb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
          >
            <motion.div variants={itemVariants} className="flex flex-col">
              <motion.div variants={itemVariants} className="mb-6">
                <NextImage
                  src="/landing-page/logo-fkg.png"
                  alt="decorative gold"
                  width={240}
                  height={53}
                  className="w-full h-full"
                />
              </motion.div>

              {/* Main heading */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  font="Bagnard"
                  weight="regular"
                  className="text-3xl min-[375px]:text-4xl md:text-5xl lg:text-7xl text-center md:text-left font-bold text-white leading-normal md:leading-tight mb-4"
                >
                  Shape
                  <br />
                  Tommorow's
                  <br />
                  Smiles
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="p"
                  font="Rubik"
                  weight="regular"
                  className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 w-full md:max-w-md text-center md:text-left"
                >
                  Denta Paramitha's Science Festival and Competition
                </Typography>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex md:justify-end md:items-end justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => scrollToSection("category")}
                  variant="gradient-yellow"
                  size="lg"
                  className="py-2 px-4 lg:py-6 lg:px-12 text-xl md:text-2xl"
                >
                  Explore Now
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
