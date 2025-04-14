"use client";
import Countdown from "@/components/Countdown";
import NextImage from "@/components/NextImage";
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
    <section className="relative min-h-full w-full">
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
          imgClassName="object-cover w-full h-full opacity-60 pointer-events-none select-none"
        />
      </div>
      <div className="container mx-auto my-[5vh] flex min-h-screen w-full flex-col items-center justify-center gap-[5vw] lg:flex-row lg:gap-[8vw]">
        <div className="z-10 md:w-1/2">
          <iframe
            src={srcVideo}
            allow="autoplay"
            allowFullScreen
            className="h-[400px] w-full overflow-hidden rounded-xl shadow-lg"
          />
        </div>
        <div className="z-10 flex flex-col items-center justify-center gap-4 md:w-1/2 md:gap-8">
          <Typography
            variant="h3"
            weight="bold"
            className="text-balance text-center text-5xl text-black"
          >
            Registration Close In
          </Typography>
          <Countdown endDate={endDate} />
          <div className="item-center mt-[2vw] flex w-full flex-col justify-center gap-2 p-4 min-[374px]:p-0 md:flex-row md:justify-between">
            <Button variant="outlineSecondary">
              <Link href={guidebookUrl} target="_blank">
                Guidebook
              </Link>
            </Button>
            <Button variant="primary">
              <Link href={registUrl}>Regist Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
