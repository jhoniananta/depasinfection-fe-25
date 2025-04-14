import NextImage from "@/components/NextImage";
import {
  imageCarouselOkgdFacultyTour,
  requirementsOkgdFacultyTour,
} from "@/contents/event-content";
import { cardSectionProps } from "@/types/event-page";
import CardComponent from "./CardComponent";

export default function CardSectionOkgd({
  title,
  images,
  requirements,
  showButton,
}: cardSectionProps) {
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
      <CardComponent
        title={title}
        images={images}
        requirements={requirements}
        showButton={showButton}
        buttonText1="Guidebook"
        buttonText2="Syllabus"
        linkButton1="https://drive.google.com/drive/folders/1Uj_JL8vU0F2hVwvT7PZdEKk5GB3e11Nq"
        linkButton2="https://drive.google.com/drive/folders/1qxpS75ie9fiSRHUtTlkSbKMX3v6SqCNP"
      />
      <CardComponent
        title={{ main: "Special", sub: "Faculty Tour" }}
        images={imageCarouselOkgdFacultyTour}
        requirements={requirementsOkgdFacultyTour}
        showButton={false}
      />
    </section>
  );
}
