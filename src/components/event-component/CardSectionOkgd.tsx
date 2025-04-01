import NextImage from "@/components/NextImage";
import { cardSectionProps } from "@/types/event-page";
import CardComponent from "./CardComponent";

export default function CardSectionOkgd({
  title,
  images,
  requirements,
  showButton,
}: cardSectionProps) {
  return (
    <section className="w-full min-h-screen relative flex justify-center items-center">
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
      />
    </section>
  );
}
