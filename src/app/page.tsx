import Category from "@/components/landing-page/Category";
import DentalEvent from "@/components/landing-page/DentalEvent";
import Hero from "@/components/landing-page/Hero";
import Timeline from "@/components/landing-page/Timeline";
import Layout from "@/layouts/Layout";

export default function Home() {
  // const t = useTranslations('HomePage');

  return (
    <Layout withFooter withNavbar>
      <main className="flex min-h-screen flex-col items-center justify-between w-full relative">
        <Hero />
        <Category />
        <DentalEvent />
        <Timeline />
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15812.75357150825!2d110.36436729788849!3d-7.769837325991146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a584b9a3e2145%3A0x12dc4ed06d523708!2sFakultas%20Kedokteran%20Gigi%20UGM!5e0!3m2!1sid!2sid!4v1742836910995!5m2!1sid!2sid"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </main>
    </Layout>
  );
}
