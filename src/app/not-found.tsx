import { Metadata } from "next";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import ButtonLink from "@/components/links/ButtonLink";
import { RiHome5Line } from "react-icons/ri";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-t from-[#37184B] to-[#7633A3]">
      <div className="relative h-screen w-screen">
        <NextImage
          src="/helper-page/decoration-notfound.png"
          alt="decoration-notfound"
          width={1280}
          height={880}
          className="absolute inset-0 z-0 w-screen"
          imgClassName="w-screen object-cover h-screen"
          priority
        />
        <div className="relative z-10 flex h-screen w-screen flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16">
          <NextImage
            src="/white-logo-depas.png"
            alt="DEPASINFECTION White logo"
            width={84}
            height={75}
            className="w-[56px] max-w-[84px]"
          />
          <div className="flex h-fit w-full max-w-[546px] flex-col items-center justify-center gap-3 px-6 sm:gap-3 md:gap-4 lg:gap-4">
            <NextImage
              src="/helper-page/404-hero.png"
              alt="404 hero"
              width={200}
              height={86}
              className="flex items-center justify-center"
              imgClassName="w-[136px] md:w-[200px] h-auto flex"
            />
            <Typography
              variant="h3"
              font="Rubik"
              weight="bold"
              className="text-center text-base text-neutral-50 sm:text-xl md:text-xl lg:text-2xl"
            >
              Oh no! we lost this page
            </Typography>
            <Typography
              variant="h3"
              font="Rubik"
              weight="regular"
              className="text-center text-[12px] text-neutral-50 sm:text-[12px] md:text-[12px] lg:text-base"
            >
              We searched everywhere but couldn't find what you're looking for.
              Let's Find a better Place for you
            </Typography>
          </div>
          <ButtonLink
            type="button"
            href="/"
            variant="gradient-yellow"
            leftIcon={RiHome5Line}
          >
            Back to home
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
