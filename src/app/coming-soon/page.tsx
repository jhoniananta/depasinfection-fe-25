import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import ButtonLink from "@/components/links/ButtonLink";
import { RiHome5Line } from "react-icons/ri";

function ComingSoonPage() {
  return (
    <main className="min-w-screen relative h-full min-h-screen w-full bg-purple-700">
      <NextImage
        src="/landing-page/bg-hero.png"
        alt="Hero background"
        fill
        priority
        quality={100}
        className="absolute inset-0"
        imgClassName="object-cover w-full h-full"
      />
      <div className="container relative z-10 flex min-h-screen flex-col items-center justify-end gap-8 px-6 pb-12 text-center md:flex-row md:items-end md:justify-center md:pb-20 lg:pb-28">
        <div className="flex flex-col items-center justify-center gap-1.5 md:items-start md:gap-4">
          <NextImage
            src="/ugm-logo.png"
            alt="UGM LOGO white"
            width={312}
            height={68}
            priority
            quality={100}
            className="w-[156px] md:w-[312px]"
            imgClassName="w-full object-contain"
          />

          <Typography
            variant="h3"
            font="Bagnard"
            className="text-center text-[40px] text-neutral-50 sm:text-5xl md:text-start md:text-6xl lg:text-8xl"
          >
            Coming Soon
          </Typography>
          <Typography
            variant="p"
            font="Rubik"
            className="text-center text-[12px] text-neutral-50 sm:text-[14px] md:text-start md:text-[16px] lg:text-[18px]"
          >
            We are happy to inform you that the website is currently under
            development to provide a better experience for you. Stay tuned for
            further information!
          </Typography>
        </div>

        <ButtonLink
          type="button"
          href="/"
          variant="gradient-yellow"
          className="w-full md:w-[400px]"
          leftIcon={RiHome5Line}
        >
          Back to home
        </ButtonLink>
      </div>
    </main>
  );
}

export default ComingSoonPage;
