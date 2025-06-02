import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { TimelineEventProps } from "@/types/event-page";
import { motion } from "motion/react";
import { Fragment } from "react";

export default function TimelineEvent({
  timelineContent,
  lineDesktopSrc,
  lineMobileSrc,
  widthlineMobile,
  heightlineMobile,
}: TimelineEventProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <section className="relative flex min-h-full flex-col items-center justify-center w-full bg-gradient-to-br from-[#5C287F] to-[#37184B] py-16 lg:h-[558px] overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <NextImage
            src="/landing-page/tl-bg-timeline.png"
            width={576}
            height={538}
            alt="timeline"
            className="absolute left-0 top-0"
          />
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            className="mb-8 md:mb-4 text-center text-4xl font-semibold text-white"
          >
            Save The <span className="font-bagnard">Dates!</span>
          </Typography>
        </motion.div>

        {/* Desktop Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative top-10 hidden w-full max-w-[1060px] pb-24 lg:ml-[80px] lg:flex xl:ml-0 xl:mr-[84px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[200px] w-full"
          >
            <NextImage
              src={lineDesktopSrc}
              alt="timeline"
              width={953}
              height={126}
              className="mt-8 block lg:w-[80%] xl:w-[953px] object-contain"
            />
            {timelineContent.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
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
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Mobile Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full h-full lg:hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <NextImage
              src={lineMobileSrc}
              alt="timeline"
              width={widthlineMobile}
              height={heightlineMobile}
              className="justify-start pl-[32px]"
            />
          </motion.div>
          <div className="relative flex flex-col items-center">
            {timelineContent.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`absolute ${event.positionSmall} flex flex-col items-start max-w-[200px]`}
              >
                <Typography variant="p" className="md:text-[16px] text-white">
                  {event.date}
                </Typography>
                <Typography
                  variant="p"
                  className="md:text-[16px] font-semibold text-white"
                >
                  {event.title.split("\n").map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </Typography>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <NextImage
            src="/landing-page/br-bg-timeline.png"
            width={1000}
            height={538}
            alt="timeline"
            className="absolute bottom-0 right-0"
          />
        </motion.div>
      </section>
    </>
  );
}
