import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { HeroEventProps } from "@/types/event-page";
import Link from "next/link";

export default function HeroEvent({
  title,
  subtitle,
  bgImage,
  urlRegist,
  buttonText,
}: HeroEventProps) {
  return (
    <>
      <section className="relative w-screen h-screen bg-purple-700">
        {/* Hero Image background */}
        <NextImage
          src={bgImage}
          alt="Hero background"
          width={2560}
          height={600}
          priority
          className="w-full absolute flex justify-center items-center"
          imgClassName="w-screen lg:container object-cover h-screen "
          quality={100}
        />
        {/* Content container */}
        <div className="container relative z-20 md:mx-auto md:px-6 h-full flex flex-col justify-end pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="flex flex-col">
              {/* Main heading */}
              <Typography
                variant="h1"
                font="Bagnard"
                weight="regular"
                className="text-3xl min-[375px]:text-4xl md:text-5xl lg:text-7xl text-center md:text-left font-bold text-white leading-normal md:leading-tight mb-4"
              >
                {title}
              </Typography>

              <Typography
                variant="p"
                font="Rubik"
                weight="regular"
                className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 w-full md:max-w-md text-center md:text-left"
              >
                {subtitle}
              </Typography>
            </div>

            <div className="flex md:justify-end md:items-end justify-center items-center">
              <Button
                variant="gradient-yellow"
                size="lg"
                className="py-2 px-4 lg:py-6 lg:px-12 text-xl md:text-2xl"
              >
                <Link href={urlRegist}>{buttonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
