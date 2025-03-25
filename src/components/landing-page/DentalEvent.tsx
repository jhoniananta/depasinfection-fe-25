"use client";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { useScrollRef } from "@/components/custom-hooks/ScrollProvider";

export default function DentalEvent() {
  const { ref } = useScrollRef("dental-event");
  return (
    <section
      className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 text-white overflow-hidden flex items-center justify-center"
      ref={ref}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-purple-700/90 z-0"></div>
      {/* Image background */}
      <NextImage
        src="/landing-page/bg-event.png"
        alt="background"
        width={2560}
        height={600}
        priority
        className="w-full absolute flex justify-center items-center"
        imgClassName="w-screen object-cover h-screen 2xl:container"
        quality={100}
      />
      <div className="relative z-10 max-w-7xl mx-auto container">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start ">
          {/* Left side - Quote and description */}
          <div className="w-full lg:w-1/2 space-y-4">
            {/* Quote mark */}
            <div className="text-6xl md:text-8xl font-bold text-white/80">
              "
            </div>

            {/* Main text */}
            <div className="text-sm md:text-base space-y-4 text-justify">
              <Typography variant="p" className="text-white">
                Depa's Infection #14 brings up the theme "Exploring Indonesian
                Culture for Advanced Technology and Dental Medicine to Achieve
                Overall Body Health" this year. An ever-evolving world of dental
                science demands us to be adaptive with the latest advancements
                in dentistry by always seeking for knowledge, new innovations
                and also constantly improving ourselves to a bigger scale. We
                can seek our ultimate potential through a series of competitions
                and events in Depa's Infection #14. This year, we gladly
                announce our new sub-event called UGM Dental Poster and Essay
                Competition for dental students in Indonesia. We hope these
                small steps can encourage younger generations to unleash their
                potential and unlock new chapters in dentistry. Be ready to
                ignite your spark with Depa's Infection #14
              </Typography>
            </div>

            {/* Organizing committee */}
            <div className="pt-4">
              <h3 className="font-bold text-lg md:text-xl">
                Organizing Committees of Depa's Infection #14
              </h3>
              <p>Name</p>
            </div>
          </div>

          {/* Right side - Profile cards */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Profile Card 1 */}
            <div className="bg-gradient-to-b from-white/20 to-white/5 rounded-3xl overflow-hidden shadow-lg">
              <div className="relative w-full h-64 md:h-80 lg:h-[480px]">
                <NextImage
                  src="/placeholder.svg?height=320&width=320"
                  alt="Committee member"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="p-6">
                <Typography
                  variant="h2"
                  className="text-4xl md:text-5xl font-bold text-purple-300"
                >
                  Name
                </Typography>
                <Typography
                  variant="p"
                  className="text-xl md:text-2xl text-purple-400"
                >
                  Division
                </Typography>
              </div>
            </div>

            {/* Profile Card 2 */}
            <div className="bg-gradient-to-b from-white/20 to-white/5 rounded-3xl overflow-hidden shadow-lg">
              <div className="relative w-full h-64 md:h-80 lg:h-[480px]">
                <NextImage
                  src="/placeholder.svg?height=320&width=320"
                  alt="Committee member"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="p-6">
                <Typography
                  variant="h2"
                  className="text-4xl md:text-5xl font-bold text-purple-300"
                >
                  Name
                </Typography>
                <Typography
                  variant="p"
                  className="text-xl md:text-2xl text-purple-400"
                >
                  Division
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
