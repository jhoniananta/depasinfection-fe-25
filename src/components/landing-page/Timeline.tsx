import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { motion } from "motion/react";
import { Fragment } from "react";

const timelineContent = [
  {
    date: "14 Apr - 18 May 2025",
    title: "Early Registration UDSRC & OKGD",
    positionLarge: "-top-8 left-10 xl:left-12",
    positionSmall: "bottom-[690px] left-[95px]",
  },
  {
    date: "19 May - 12 Jul 2025",
    title: "Regular Registration UDSRC & OKGD",
    positionLarge: "top-[115px] left-[120px] xl:top-[130px] xl:left-[140px]",
    positionSmall: "bottom-[620px] left-[95px]",
  },
  {
    date: "14 Apr - 29 Jul 2025",
    title: "Submission UDSRC",
    positionLarge: "-top-8 left-[195px] xl:left-[225px]",
    positionSmall: "bottom-[570px] left-[95px]",
  },
  {
    date: "30 Jul 2025",
    title: "Technical\n Meeting",
    positionLarge: "top-[115px] left-[270px] xl:top-[130px] xl:left-[320px]",
    positionSmall: "bottom-[490px] left-[95px]",
  },
  {
    date: "30 Jul - 31 Jul 2025",
    title: "Try Out OKGD",
    positionLarge: "-top-3 left-[350px] xl:left-[410px]",
    positionSmall: "bottom-[440px] left-[95px]",
  },
  {
    date: "02 Aug 2025",
    title: "Preliminary\n Round OKGD",
    positionLarge: "top-[115px] left-[425px] xl:top-[130px] xl:left-[500px]",
    positionSmall: "bottom-[360px] left-[95px]",
  },
  {
    date: "09 Aug 2025",
    title: "Quarter-Finals Round OKGD",
    positionLarge: "-top-4 left-[505px] xl:left-[595px]",
    positionSmall: "bottom-[290px] left-[95px]",
  },
  {
    date: "10 Aug 2025",
    title: "Annouce Finalist UDSRC & Semifinalist OKGD",
    positionLarge: "top-[115px] left-[580px] xl:top-[130px] xl:left-[680px]",
    positionSmall: "bottom-[220px] left-[95px]",
  },
  {
    date: "11 Aug 2025",
    title: "TM Finalist UDSRC & Semifinalist OKGD",
    positionLarge: "-top-8 left-[655px] xl:left-[775px]",
    positionSmall: "bottom-[140px] left-[95px]",
  },
  {
    date: "23 Aug 2025",
    title: "Semifinal OKGD & Final Presentation UDSRC",
    positionLarge: "top-[115px] left-[735px] xl:top-[130px] xl:left-[870px]",
    positionSmall: "bottom-[65px] left-[95px]",
  },
  {
    date: "24 Aug 2025",
    title: "Final & Grand Final OKGD & Winner Announcement",
    positionLarge: "-top-8 left-[810px] xl:left-[950px]",
    positionSmall: "-bottom-2 left-[95px]",
  },
];

export default function Timeline() {
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
          className="relative top-10 hidden w-full max-w-[1080px] pb-24 lg:ml-[80px] lg:flex xl:ml-0 xl:mr-[84px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[200px] w-full"
          >
            <NextImage
              src="/landing-page/line-desktop.png"
              alt="timeline"
              width={953}
              height={126}
              className="mt-8 block lg:w-[80%] xl:w-[953px] object-contain"
            />
            {timelineContent.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`absolute ${event.positionLarge} flex flex-col items-start max-w-[142px]`}
              >
                <Typography variant="p" className="md:text-[16px] text-white">
                  {event.title.split("\n").map((line, i) => (
                    <Fragment key={i}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </Typography>
                <Typography
                  variant="p"
                  className="md:text-[16px] font-semibold text-white"
                >
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
              src="/landing-page/line-mobile.png"
              alt="timeline"
              width={272}
              height={828}
              className="justify-start pl-[28px]"
            />
          </motion.div>
          <div className="relative flex flex-col items-center">
            {timelineContent.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`absolute ${event.positionSmall} flex flex-col items-start max-w-[200px]`}
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
