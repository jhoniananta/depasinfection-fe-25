import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import {
  imageCarouselOkgdFacultyTour,
  requirementsOkgdFacultyTour,
} from "@/contents/event-content";
import { cardSectionProps } from "@/types/event-page";
import { motion } from "motion/react";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import ImageCarousel from "../ImageCarousel";
import CardComponent from "./CardComponent";

export default function CardSectionOkgd({
  title,
  images,
  buttonText1,
  buttonText2,
  linkButton1,
  linkButton2,
  requirements,
  showButton = true,
}: cardSectionProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="w-full min-h-screen relative flex flex-col justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <NextImage
          src="/landing-page/bg-banner-section.png"
          alt="Hero background"
          fill
          sizes="100vw"
          quality={100}
          priority
          className="inset-0 w-full object-cover"
          imgClassName="object-cover w-full h-full opacity-60 select-none pointer-events-none"
        />
      </div>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-50px" }}
        className="container z-10 mx-4 my-8 max-w-6xl rounded-3xl bg-purple-600 p-8 text-white md:mx-8 md:my-12 md:p-12 lg:h-full"
      >
        <div className="mx-auto max-w-7xl">
          {/* Carousel section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <ImageCarousel images={images} className="mb-12 rounded-3xl" />
          </motion.div>

          {/* Content section */}
          <div className="grid grid-cols-1 gap-8 md:gap-2 md:grid-cols-2">
            {/* Left column - Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant={"h4"}
                className="text-center text-4xl leading-tight text-white md:text-left md:leading-none lg:text-[64px]"
              >
                <strong>{title.main}</strong>
                <br />
                {title.sub}
              </Typography>

              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mt-8 flex flex-wrap items-center justify-center gap-2 md:justify-start"
                >
                  {linkButton1 && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={linkButton1}
                        target="_blank"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 p-2 text-sm text-black transition hover:bg-amber-400 md:w-auto md:px-6 md:py-3 md:text-2xl"
                      >
                        <IoDocumentTextOutline />
                        {buttonText1}
                      </Link>
                    </motion.div>
                  )}

                  {linkButton2 && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={linkButton2}
                        target="_blank"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 p-2 text-sm text-black transition hover:bg-amber-400 md:w-auto md:px-6 md:py-3 md:text-2xl"
                      >
                        <IoDocumentTextOutline />
                        {buttonText2}
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Right column - Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg"
            >
              <ul className="space-y-0">
                {requirements.map((requirement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="mr-2 text-xl">•</span>
                    <span className="text-justify">{requirement}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <CardComponent
        title={{ main: "Special", sub: "Faculty Tour" }}
        images={imageCarouselOkgdFacultyTour}
        requirements={requirementsOkgdFacultyTour}
        showButton={false}
      />
    </section>
  );
}
