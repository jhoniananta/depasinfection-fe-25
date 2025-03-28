import AboutEvent from "@/components/event-component/AboutEvent";
import CardSection from "@/components/event-component/CardSection";
import HeroEvent from "@/components/event-component/HeroEvent";
import MapEvent from "@/components/event-component/MapEvent";
import RegistEvent from "@/components/event-component/RegistEvent";
import TimelineEvent from "@/components/event-component/TimelineEvent";
import {
  imageCarousel,
  requirements,
  timelineContent,
} from "@/contents/event-content";
import Layout from "@/layouts/Layout";
import { useTranslations } from "next-intl";

export default function OKGDHome() {
  const t = useTranslations("OKGDpage");
  return (
    <Layout withFooter withNavbar>
      <main className="flex min-h-screen flex-col items-center justify-between w-full relative overflow-hidden">
        <HeroEvent
          bgImage="/okgd-page/bg-event-okgd.png"
          buttonText={t("home.buttonText")}
          title={t("home.title")}
          subtitle={t("home.subTitle")}
          urlRegist="/okgd-event/register"
        />
        <AboutEvent
          poster="/okgd-page/OKGD-poster.png"
          title="OKGD"
          aboutTitle={t("about.title")}
          buttonText={t("home.buttonText")}
          normalContent={t("about.description")}
          boldContent={t("about.descriptionBold")}
        />
        <CardSection images={imageCarousel} requirements={requirements} />
        <TimelineEvent timelineContent={timelineContent} />
        <RegistEvent
          registUrl="/okgd-event/register"
          guidebookUrl="/okgd-event/guidebook"
          endDate="2025-07-12T00:00:00"
          srcVideo="https://www.youtube.com/embed/8e3gT2vB8"
        />
        <MapEvent />
      </main>
    </Layout>
  );
}
