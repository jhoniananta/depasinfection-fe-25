"use client";

import withAuth from "@/components/WithAuth";
import AboutEvent from "@/components/event-component/AboutEvent";
import CardSectionOkgd from "@/components/event-component/CardSectionOkgd";
import HeroEvent from "@/components/event-component/HeroEvent";
import MapEvent from "@/components/event-component/MapEvent";
import RegistEvent from "@/components/event-component/RegistEvent";
import TimelineEvent from "@/components/event-component/TimelineEvent";
import {
  imageCarouselOkgd,
  lineSourceOkgd,
  requirementsOkgd,
  titleGeneral,
} from "@/contents/event-content";
import Layout from "@/layouts/Layout";
import { useTranslations } from "next-intl";

const timelineContentOkgd = [
  {
    date: "14 Apr - 18 May 2025",
    title: "Early Registration",
    positionLarge: "top-4 left-12 xl:left-14",
    positionSmall: "bottom-[445px] left-[100px]",
  },
  {
    date: "19 May - 12 Jul 2025",
    title: "Regular\n Registration",
    positionLarge: "top-[140px] left-[160px] xl:top-[150px] xl:left-[185px]",
    positionSmall: "bottom-[365px] left-[100px]",
  },
  {
    date: "30 Jul 2025",
    title: "Technical Meeting",
    positionLarge: "top-3 left-[265px] xl:left-[310px]",
    positionSmall: "bottom-[315px] left-[100px]",
  },
  {
    date: "30 - 31 Jul 2025",
    title: "Try Out",
    positionLarge: "top-[140px] left-[375px] xl:top-[160px] xl:left-[440px]",
    positionSmall: "bottom-[265px] left-[100px]",
  },
  {
    date: "02 Aug 2025",
    title: "Preliminary Round",
    positionLarge: "top-5 left-[480px] xl:left-[570px]",
    positionSmall: "bottom-[210px] left-[100px]",
  },
  {
    date: "09 Aug 2025",
    title: "Quarter-Finals\nRound",
    positionLarge: "top-[140px] left-[590px] xl:top-[150px] xl:left-[700px]",
    positionSmall: "bottom-[135px] left-[100px]",
  },
  {
    date: "23 Aug 2025",
    title: "Semifinal Round\n& Faculty Tour",
    positionLarge: "top-3 right-[165px] xl:right-[90px]",
    positionSmall: "bottom-[65px] left-[100px]",
  },
  {
    date: "24 Aug 2025",
    title: "Final\n & Grand Final",
    positionLarge: "top-[140px] right-[85px] xl:top-[150px] xl:-right-2",
    positionSmall: "-bottom-2 left-[100px]",
  },
];

export default withAuth(OKGDHome, "OPTIONAL");
function OKGDHome() {
  const t = useTranslations("OKGDpage");
  return (
    <Layout withFooter withNavbar>
      <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden">
        <HeroEvent
          bgImage="/okgd-page/bg-event-okgd.png"
          buttonText={t("home.buttonText")}
          title={t("home.title")}
          subtitle={t("home.subTitle")}
          urlRegist="/event-register/okgd"
          isButtonDisabled={true}
        />
        <AboutEvent
          poster="/okgd-page/OKGD-poster-terbaru.png"
          title="OKGD-baru"
          aboutTitle={t("about.title")}
          buttonText={"Download Poster"}
          normalContent={t("about.description")}
          boldContent={t("about.descriptionBold")}
        />
        <CardSectionOkgd
          images={imageCarouselOkgd}
          requirements={requirementsOkgd}
          title={titleGeneral}
        />
        <TimelineEvent
          timelineContent={timelineContentOkgd}
          lineDesktopSrc={lineSourceOkgd.desktop}
          lineMobileSrc={lineSourceOkgd.mobile}
          widthlineMobile={lineSourceOkgd.widthMobile}
          heightlineMobile={lineSourceOkgd.heightMobile}
        />
        <RegistEvent
          registUrl="/event-register/okgd"
          guidebookUrl="https://drive.google.com/drive/folders/1Uj_JL8vU0F2hVwvT7PZdEKk5GB3e11Nq?usp=drive_link"
          endDate="2025-07-13T00:00:00"
          srcVideo="https://drive.google.com/file/d/1AN-ZJpra7_sInNFR8SO7Ub_nLlHYJULj/preview"
        />
        <MapEvent />
      </main>
    </Layout>
  );
}
