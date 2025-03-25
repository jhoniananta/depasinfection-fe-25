import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { Fragment } from "react";

const timelineContent = [
  {
    date: "July 31 - August 28",
    title: "Register",
    positionLarge: "top-4 left-12 xl:left-14",
    positionSmall: "bottom-[480px] left-[120px]",
  },
  {
    date: "August 31 - September 1",
    title: "Register",
    positionLarge: "top-[130px] left-[200px] xl:top-[150px] xl:left-[240px]",
    positionSmall: "bottom-[380px] left-[120px]",
  },
  {
    date: "July 31 - September 18",
    title: "Register",
    positionLarge: "top-4 left-[360px] xl:left-[415px]",
    positionSmall: "bottom-[280px] left-[120px]",
  },
  {
    date: "September 15 & 22",
    title: "Register",
    positionLarge: "top-[130px] left-[510px] xl:top-[150px] xl:left-[600px]",
    positionSmall: "bottom-[190px] left-[120px]",
  },
  {
    date: "September 29",
    title: "Register",
    positionLarge: "top-4 left-[670px] xl:left-[775px]",
    positionSmall: "bottom-[90px] left-[120px]",
  },
  {
    date: "October 26",
    title: "Register",
    positionLarge: "top-[130px] left-[820px] xl:top-[150px] xl:left-[960px]",
    positionSmall: "bottom-[0px] left-[120px]",
  },
];

export default function Timeline() {
  return (
    <>
      <section className="relative flex min-h-full flex-col items-center justify-center w-full bg-gradient-to-br from-[#5C287F] to-[#37184B] py-16 lg:h-[558px] overflow-x-hidden">
        <NextImage
          src="/landing-page/tl-bg-timeline.png"
          width={576}
          height={538}
          alt="timeline"
          className="absolute left-0 top-0"
        />
        <Typography
          variant="h1"
          className="mb-8 md:mb-4 text-center text-4xl font-semibold text-white"
        >
          Save The <span className="font-bagnard">Dates!</span>
        </Typography>
        {/* Desktop Timeline */}
        <div className="relative top-10 hidden w-full max-w-[1060px] pb-24 lg:ml-[80px] lg:flex xl:ml-0 xl:mr-[84px]">
          <div className="relative h-[200px] w-full">
            <NextImage
              src="/landing-page/line-desktop.png"
              alt="timeline"
              width={953}
              height={126}
              className="mt-8 block lg:w-[80%] xl:w-[953px] object-contain"
            />
            {timelineContent.map((event, index) => (
              <div
                key={index}
                className={`absolute ${event.positionLarge} flex flex-col items-start`}
              >
                <Typography variant="p" className="font-semibold text-white">
                  {event.title.split("\n").map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </Typography>
                <Typography variant="p" className="font-semibold text-white">
                  {event.date}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile Timeline */}
        <div className="relative w-full lg:hidden">
          <NextImage
            src="/landing-page/line-mobile.png"
            alt="timeline"
            width={110}
            height={553}
            className="justify-start pl-[32px]"
          />
          <div className="relative flex flex-col items-center">
            {timelineContent.map((event, index) => (
              <div
                key={index}
                className={`absolute ${event.positionSmall} flex flex-col items-start`}
              >
                <Typography variant="p" className="font-semibold text-white">
                  {event.date}
                </Typography>
                <Typography variant="p" className="font-semibold text-white">
                  {event.title.split("\n").map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        <NextImage
          src="/landing-page/br-bg-timeline.png"
          width={1000}
          height={538}
          alt="timeline"
          className="absolute bottom-0 right-0"
        />
      </section>
    </>
  );
}
