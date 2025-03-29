import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { cardSectionProps } from "@/types/event-page";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import ImageCarousel from "../ImageCarousel";

export default function CardSection({
  images,
  requirements,
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
      <div className="max-w-6xl lg:h-[911px] rounded-3xl bg-purple-600 p-8 md:p-12 text-white container my-8 md:my-16 mx-4 md:mx-8 z-10">
        <div className="mx-auto max-w-7xl">
          {/* Carousel section */}
          <ImageCarousel images={images} className="mb-12 rounded-3xl" />

          {/* Content section */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left column - Title */}
            <div>
              <Typography
                variant={"h4"}
                className="text-4xl lg:text-[64px] leading-tight md:leading-none text-white text-center md:text-left"
              >
                <strong>General</strong>
                <br />
                Requirements
              </Typography>

              <div className="mt-8 flex flex-col md:flex-row gap-2 justify-center md:justify-start items-center md:gap-4">
                <Link
                  href="/guidebook"
                  className="flex items-center gap-2 rounded-lg bg-amber-300 p-2 md:px-6 md:py-3 text-black transition hover:bg-amber-400 w-full md:w-auto justify-center text-sm md:text-2xl"
                >
                  <IoDocumentTextOutline />
                  Guidebook
                </Link>

                <Link
                  href="/syllabus"
                  className="flex items-center gap-2 rounded-lg bg-amber-300 p-2 md:px-6 md:py-3 text-black transition hover:bg-amber-400 w-full md:w-auto text-center justify-center text-sm md:text-2xl"
                >
                  <IoDocumentTextOutline />
                  Syllabus
                </Link>
              </div>
            </div>

            {/* Right column - Requirements */}
            <div className="text-lg">
              <ul className="space-y-0">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-xl">•</span>
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
