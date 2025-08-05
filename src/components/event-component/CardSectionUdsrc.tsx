import NextImage from "@/components/NextImage";
import { imageCarouselUdsrcCityTour } from "@/contents/event-content";
import { cardSectionProps } from "@/types/event-page";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import CardComponent from "./CardComponent";

export default function CardSectionUdsrc({
  title,
  images,
  requirements,
  showButton,
}: cardSectionProps) {
  const t = useTranslations("UDSRCpage");
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center"
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
          imgClassName="object-cover w-full h-full opacity-60 select-none pointer-events-none"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <CardComponent
          title={title}
          images={images}
          requirements={requirements}
          showButton={showButton}
          buttonText1="Guidebook Poster"
          buttonText2="Guidebook 3 Minutes Competition"
          linkButton1="https://drive.google.com/drive/folders/1K0LoTdkeqtd7NX0LfeynBsNaAz0y55RE"
          linkButton2="https://drive.google.com/drive/folders/1vyLG-cnmp-Ht1GluDEVVg0uTnxQ0U3Hu"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <CardComponent
          title={{ main: "Special", sub: "City Tour" }}
          images={imageCarouselUdsrcCityTour}
          requirements={[t("cityTour.description")]}
          showButton={false}
        />
      </motion.div>
    </motion.section>
  );
}
