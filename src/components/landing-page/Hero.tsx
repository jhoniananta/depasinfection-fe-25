"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "../buttons/Button";

export default function Hero() {
  return (
    <>
      <section className=" relative w-screen h-screen bg-purple-700">
        {/* Hero Image background */}
        <NextImage
          src="/landing-page/bg-hero.png"
          alt="Hero background"
          width={2560}
          height={600}
          priority
          className="w-full absolute flex  justify-center items-center"
          imgClassName="w-screen lg:container object-cover h-screen "
          quality={100}
        />

        {/* Decorative right gold */}
        <div className="absolute right-0 bottom-0 opacity-80 z-10">
          <NextImage
            src="/landing-page/decorative-gold.png"
            alt="decorative gold"
            width={1116}
            height={613}
            className="w-full h-full"
          />
        </div>
        {/* Content container */}
        <div className="container relative z-20 md:mx-auto md:px-6 h-full flex flex-col justify-end pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="flex flex-col">
              <div className="mb-6">
                <NextImage
                  src="/landing-page/logo-fkg.png"
                  alt="decorative gold"
                  width={240}
                  height={53}
                  className="w-full h-full"
                />
              </div>

              {/* Main heading */}
              <Typography
                variant="h1"
                font="Bagnard"
                weight="regular"
                className="text-3xl min-[375px]:text-4xl md:text-5xl lg:text-7xl text-center md:text-left font-bold text-white leading-normal md:leading-tight mb-4"
              >
                Shape
                <br />
                Tommorow's
                <br />
                Smiles
              </Typography>

              <Typography
                variant="p"
                font="Rubik"
                weight="regular"
                className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 w-full md:max-w-md text-center md:text-left"
              >
                Denta Paramitha's Science Festival and Competition
              </Typography>
            </div>

            <div className="flex md:justify-end md:items-end justify-center items-center">
              <Button
                variant="gradient-yellow"
                size="lg"
                className="py-2 px-4 lg:py-6 lg:px-12 text-xl md:text-2xl"
              >
                Explore Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
