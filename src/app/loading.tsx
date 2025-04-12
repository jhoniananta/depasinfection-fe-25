"use client";

import { Metadata } from "next";

import DotLoader from "@/components/DotLoader";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Loading...",
};

export default function LoadingGlobalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent early render

  return (
    <main className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-t from-[#37184B] to-[#7633A3]">
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <NextImage
          src="/helper-page/sparkling-decoration.png"
          alt="flower background"
          width={1920}
          height={1080}
          className="absolute z-10 w-full max-w-[1024px]"
          imgClassName="w-full object-contain"
        />
        <NextImage
          src="/helper-page/flower-icon.png"
          alt="loading flower icon"
          width={1920}
          height={1080}
          className="w-full max-w-[1024px]"
        />
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-1 md:gap-1.5 lg:gap-2">
          <div className="font-bagnard text-4xl text-neutral-50 sm:text-5xl md:text-6xl lg:text-8xl">
            Loading
            <DotLoader />
          </div>

          <Typography
            variant="h3"
            font="Rubik"
            className="text-[12px] text-neutral-50 sm:text-base md:text-xl lg:text-2xl"
          >
            Please wait
          </Typography>
        </div>
      </div>
    </main>
  );
}
