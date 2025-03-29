import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { TimelineEventProps } from "@/types/event-page";
import { Fragment } from "react";

export default function TimelineEvent({ timelineContent }: TimelineEventProps) {
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
