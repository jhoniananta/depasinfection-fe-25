"use client";

import withAuth from "@/components/WithAuth";
import AboutEvent from "@/components/event-component/AboutEvent";
import CardSectionUdsrc from "@/components/event-component/CardSectionUdsrc";
import HeroEvent from "@/components/event-component/HeroEvent";
import MapEvent from "@/components/event-component/MapEvent";
import RegistEvent from "@/components/event-component/RegistEvent";
import TimelineEvent from "@/components/event-component/TimelineEvent";
import { imageCarouselUdsrc, lineSourceUdsrc } from "@/contents/event-content";
import Layout from "@/layouts/Layout";
import { useTranslations } from "next-intl";

const timelineContentUdsrc = [
  {
    date: "14 Apr - 18 May 2025",
    title: "Early Registration",
    positionLarge: "top-4 left-12 xl:left-14",
    positionSmall: "bottom-[480px] left-[110px]",
  },
  {
    date: "19 May - 12 Jul 2025",
    title: "Regular Registration",
    positionLarge: "top-[130px] left-[200px] xl:top-[150px] xl:left-[240px]",
    positionSmall: "bottom-[380px] left-[110px]",
  },
  {
    date: "14 Apr - 29 Jul 2025",
    title: "Submission",
    positionLarge: "top-4 left-[360px] xl:left-[415px]",
    positionSmall: "bottom-[280px] left-[110px]",
  },
  {
    date: "10 Jul 2025",
    title: "Finalist Annoucement",
    positionLarge: "top-[130px] left-[500px] xl:top-[150px] xl:left-[600px]",
    positionSmall: "bottom-[190px] left-[110px]",
  },
  {
    date: "23 Aug 2025",
    title: "Final Presentation\n& City Tour",
    positionLarge: "top-4 left-[655px] xl:left-[775px]",
    positionSmall: "bottom-[80px] left-[110px]",
  },
  {
    date: "24 Aug 2025",
    title: "Winner\n Annoucement",
    positionLarge: "top-[130px] left-[810px] xl:top-[150px] xl:left-[960px]",
    positionSmall: "-bottom-4 left-[110px]",
  },
];

export default withAuth(UDSRCHome, "OPTIONAL");
function UDSRCHome() {
  const t = useTranslations("UDSRCpage");
  return (
    <Layout withFooter withNavbar>
      <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden">
        <HeroEvent
          bgImage="/udsrc-page/bg-event-udsrc.png"
          buttonText={t("home.buttonText")}
          title={t("home.title")}
          subtitle={t("home.subTitle")}
          urlRegist="/event-register/udsrc"
          isButtonDisabled={true}
        />
        <AboutEvent
          poster="/udsrc-page/UDSRC-poster-terbaru.png"
          title="UDSRC"
          aboutTitle={t("about.title")}
          buttonText={"Download Poster"}
          normalContent={t("about.description")}
          boldContent={t("about.descriptionBold")}
        />
        <CardSectionUdsrc
          images={imageCarouselUdsrc}
          requirements={t.raw("requirements.items")}
          title={t.raw("requirements.general")}
        />
        <TimelineEvent
          timelineContent={timelineContentUdsrc}
          lineDesktopSrc={lineSourceUdsrc.desktop}
          lineMobileSrc={lineSourceUdsrc.mobile}
          widthlineMobile={lineSourceUdsrc.widthMobile}
          heightlineMobile={lineSourceUdsrc.heightMobile}
        />
        <RegistEvent
          registUrl="/event-register/udsrc"
          guidebookUrl="https://drive.google.com/drive/folders/1K0LoTdkeqtd7NX0LfeynBsNaAz0y55RE"
          endDate="2025-07-13T00:00:00"
          srcVideo="https://drive.google.com/file/d/1AN-ZJpra7_sInNFR8SO7Ub_nLlHYJULj/preview"
        />
      </main>
      <MapEvent />
    </Layout>
  );
}
