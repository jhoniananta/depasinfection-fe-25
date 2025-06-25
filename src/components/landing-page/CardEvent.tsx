"use client";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { motion } from "motion/react";
import Link from "next/link";

type CardProps = {
  src: string;
  title: string;
  subtitle: string;
  urlLink: string;
};

export default function CardEvent({
  src,
  title,
  subtitle,
  urlLink,
}: CardProps) {
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
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-50px" }}
        className="relative min-w-[272px] min-h-[360px] max-w-[424px] max-h-[480px] w-full h-full rounded-3xl overflow-hidden group cursor-pointer"
      >
        <Link href={urlLink}>
          <NextImage
            src={src}
            alt={title}
            width={424}
            height={480}
            className="object-cover rounded-3xl"
            priority
          />
          <motion.div
            variants={contentVariants}
            className="absolute inset-0 flex flex-col justify-end p-10 z-10"
          >
            <Typography
              variant="h1"
              weight="extrabold"
              className="text-white text-[64px] relative text-center"
            >
              {title}
              <span className="text-[24px] block leading-tight font-medium">
                {subtitle}
              </span>
            </Typography>
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
}
