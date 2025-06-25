import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export interface ScrollProps {
  handleScroll: () => void;
}

export default function AboutBanner({
  handleScroll,
}: ScrollProps): React.ReactElement {
  const t = useTranslations("HomePage");

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="z-20 max-w-6xl rounded-xl bg-white shadow-xl"
    >
      <div className="flex flex-col items-center justify-center gap-8 px-6 py-8 md:flex-row md:justify-between md:px-12 md:py-16">
        {/* Logo on the left */}
        <motion.div variants={itemVariants} className="h-full w-full">
          <NextImage
            src="/landing-page/logo-depas.png"
            alt="Depa's Infection Logo"
            width={200}
            height={150}
            className="flex h-full w-full items-center justify-center"
            priority
          />
        </motion.div>

        {/* Content on the right */}
        <motion.div
          variants={itemVariants}
          className="space-y-3 text-center md:text-left"
        >
          <Typography
            variant="h2"
            font="Rubik"
            className="text-2xl font-bold md:text-3xl"
          >
            <span className="text-black">{t("about.title")} </span>
            <span className="font-bagnard text-purple-600">
              {t("about.titleDifferentFont")}
            </span>
          </Typography>

          <Typography
            font="Rubik"
            variant="p"
            className="text-justify text-sm text-gray-800 md:text-base"
          >
            {t("about.description")}
          </Typography>

          <motion.div variants={itemVariants} className="pt-2">
            <Button
              variant="gradient-yellow"
              size="base"
              className="text-md md:text-lg"
              onClick={handleScroll}
            >
              Explore Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
