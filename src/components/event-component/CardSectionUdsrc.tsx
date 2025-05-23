import NextImage from "@/components/NextImage";
import {
  imageCarouselUdsrcCityTour,
  requirementsUdsrcCityTour,
} from "@/contents/event-content";
import { cardSectionProps } from "@/types/event-page";
import CardComponent from "./CardComponent";

export default function CardSectionUdsrc({
  title,
  images,
  requirements,
  showButton,
}: cardSectionProps) {
  return (
    <section className="w-full min-h-screen relative flex flex-col justify-center items-center">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <NextImage
          src="/landing-page/bg-banner-section.png"
          alt="Hero background"
          fill
          sizes="100vw"
          quality={100}
          priority
          className="object-cover inset-0 w-full"
          imgClassName="object-cover w-full h-full opacity-60 select-none pointer-events-none"
        />
      </div>
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
      <CardComponent
        title={{ main: "Special", sub: "City Tour" }}
        images={imageCarouselUdsrcCityTour}
        requirements={requirementsUdsrcCityTour}
        showButton={false}
      />
    </section>
  );
}
