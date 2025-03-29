"use client";
import Countdown from "@/components/Countdown";
import NextImage from "@/components/NextImage";
import NextVideo from "@/components/NextVideo";
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { RegistEventProps } from "@/types/event-page";
import Link from "next/link";

export default function RegistEvent({
  srcVideo,
  endDate,
  guidebookUrl,
  registUrl,
}: RegistEventProps) {
  return (
    <section className="min-h-full w-full relative">
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
          imgClassName="object-cover w-full h-full opacity-60 pointer-events-none select-none"
        />
      </div>
      <div className="container mx-auto flex flex-col lg:flex-row gap-[5vw] lg:gap-[8vw] items-center justify-center w-full min-h-screen my-[5vh]">
        <div className="z-10 md:w-1/2">
          <NextVideo
            src={srcVideo}
            className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-8 z-10 md:w-1/2">
          <Typography
            variant="h3"
            weight="bold"
            className="text-black text-5xl text-center"
          >
            Registration Close In
          </Typography>
          <Countdown endDate={endDate} />
          <div className="flex flex-col md:flex-row item-center justify-center md:justify-between gap-2 w-full mt-[2vw]">
            <Button
              variant="outline"
              className="bg-transparent hover:bg-[#f5f0dd] text-[#a88a44] font-bold text-2xl py-6 px-8 md:px-12 lg:px-14 border-2 border-[#c9a955] shadow-sm"
            >
              <Link href={guidebookUrl}>Guidebook</Link>
            </Button>
            <Button className="bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 text-olive-900 font-bold text-2xl py-6 px-8 md:px-12 lg:px-14 shadow-md text-[#a88a44]">
              <Link href={registUrl}>Regist Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
