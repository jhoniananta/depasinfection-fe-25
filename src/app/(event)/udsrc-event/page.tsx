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

export default function UDSRCHome() {
  const t = useTranslations("UDSRCpage");
  return (
    <Layout withFooter withNavbar>
      <main className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden">
        <HeroEvent
          bgImage="/udsrc-page/bg-event-udsrc.png"
          buttonText={t("home.buttonText")}
          title={t("home.title")}
          subtitle={t("home.subTitle")}
          urlRegist="/udsrc-page/register"
        />
        <AboutEvent
          poster="/udsrc-page/UDSRC-poster.png"
          title="UDSRC"
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
      </main>
      <MapEvent />
    </Layout>
  );
}
