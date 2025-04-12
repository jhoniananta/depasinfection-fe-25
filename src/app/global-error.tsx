"use client";

import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";
import { useEffect } from "react";
import { RiHome5Line, RiRefreshLine } from "react-icons/ri";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import ButtonLink from "@/components/links/ButtonLink";

export const metadata: Metadata = {
  title: "Error",
};

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

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
            <Typography
              variant="h3"
              font="Bagnard"
              weight="bold"
              className="text-center text-[64px] text-cream-400 sm:text-[68px] md:text-7xl lg:text-8xl"
            >
              ERROR
            </Typography>
            <Typography
              variant="h3"
              font="Rubik"
              weight="bold"
              className="text-center text-base text-neutral-50 sm:text-xl md:text-xl lg:text-2xl"
            >
              Whoops!
            </Typography>
            <Typography
              variant="p"
              font="Rubik"
              weight="regular"
              className="text-center text-[12px] text-neutral-50 sm:text-[12px] md:text-[12px] lg:text-base"
            >
              It looks like our website took a wrong turn somewhere in
              cyberspace. Fear not, we're sending out a search party of coding
              wizards to bring it back home.
            </Typography>
          </div>
          <div className="flex gap-3">
            <ButtonLink
              type="button"
              href="/"
              variant="gradient-yellow"
              leftIcon={RiHome5Line}
            >
              Back to home
            </ButtonLink>
            <Button
              variant="red"
              onClick={() => window.history.back()}
              // className="text-neutral-900"
              leftIcon={RiRefreshLine}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
