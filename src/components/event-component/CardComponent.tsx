import Typography from "@/components/Typography";
import { cardSectionProps } from "@/types/event-page";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import ImageCarousel from "../ImageCarousel";

export default function CardComponent({
  title,
  images,
  buttonText1,
  buttonText2,
  linkButton1,
  linkButton2,
  requirements,
  showButton = true,
}: cardSectionProps) {
  return (
    <div className="container z-10 mx-4 my-8 max-w-6xl rounded-3xl bg-purple-600 p-8 text-white md:mx-8 md:my-12 md:p-12 lg:h-full">
      <div className="mx-auto max-w-7xl">
        {/* Carousel section */}
        <ImageCarousel images={images} className="mb-12 rounded-3xl" />

        {/* Content section */}
        <div className="grid grid-cols-1 gap-8 md:gap-2 md:grid-cols-2">
          {/* Left column - Title */}
          <div>
            <Typography
              variant={"h4"}
              className="text-center text-4xl leading-tight text-white md:text-left md:leading-none lg:text-[64px]"
            >
              <strong>{title.main}</strong>
              <br />
              {title.sub}
            </Typography>

            {showButton && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                {linkButton1 && (
                  <Link
                    href={linkButton1}
                    target="_blank"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 p-2 text-sm text-black transition hover:bg-amber-400 md:w-auto md:px-6 md:py-3 md:text-2xl"
                  >
                    <IoDocumentTextOutline />
                    {buttonText1}
                  </Link>
                )}

                {linkButton2 && (
                  <Link
                    href={linkButton2}
                    target="_blank"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-300 p-2 text-sm text-black transition hover:bg-amber-400 md:w-auto md:px-6 md:py-3 md:text-2xl"
                  >
                    <IoDocumentTextOutline />
                    {buttonText2}
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right column - Requirements */}
          <div className="text-lg">
            <ul className="space-y-0">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-xl">•</span>
                  <span className="text-justify">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
