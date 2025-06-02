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
      <section className="relative w-screen h-screen bg-purple-700">
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
            className="w-full absolute flex justify-center items-center"
            imgClassName="w-screen lg:container object-cover h-screen"
            quality={100}
          />
        </motion.div>
        {/* Content container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container relative z-20 md:mx-auto md:px-6 h-full flex flex-col justify-end pb-16 md:pb-24"
        >
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
          >
            <div className="flex flex-col">
              {/* Main heading */}
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h1"
                  font="Bagnard"
                  weight="regular"
                  className="text-3xl min-[375px]:text-4xl md:text-5xl lg:text-7xl text-center md:text-left font-bold text-white leading-normal md:leading-tight mb-4"
                >
                  {title}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="p"
                  font="Rubik"
                  weight="regular"
                  className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 w-full md:max-w-md text-center md:text-left"
                >
                  {subtitle}
                </Typography>
              </motion.div>
            </div>

            <div className="flex md:justify-end md:items-end justify-center items-center">
              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="gradient-yellow"
                    size="lg"
                    className="py-2 px-4 lg:py-6 lg:px-12 text-xl md:text-2xl"
                  >
                    <Link href={urlRegist}>{buttonText}</Link>
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
