"use client";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { AboutEventProps } from "@/types/event-page";
import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function AboutEvent({
  aboutTitle,
  buttonText,
  title,
  normalContent,
  boldContent,
  poster,
}: AboutEventProps) {
  const [open, setOpen] = useState(false);
  const zoomRef = useRef(null);
  // Handle download function
  const handleDownload = async () => {
    try {
      // Construct the correct file path
      const filePath = `/images/${poster}`;

      const response = await fetch(filePath);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}-poster.png`; // Set the download filename

      // Append to document, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the temporary URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading poster:", error);
    }
  };
  return (
    <>
      <section className="container mx-auto my-8 flex min-h-screen w-full flex-col items-center justify-center gap-8 md:my-16 lg:flex-row lg:gap-12">
        {/* Image Section*/}
        <div
          className="relative flex h-full w-fit cursor-pointer items-center justify-center rounded-3xl"
          onClick={() => setOpen(true)}
        >
          <NextImage
            src={poster}
            alt={title}
            width={424}
            height={524}
            className="z-0 flex h-full w-full items-center justify-center"
            imgClassName="rounded-3xl object-cover w-full h-full lg:h-[550px] lg:w-[440px]"
          />
          <div className="absolute left-0 top-0 z-10 size-full h-full rounded-3xl bg-gradient-to-b from-neutral-100 to-[#B20000] opacity-40" />
        </div>
        {/* Content Section */}
        <div className="h-full space-y-3 px-4 text-center lg:w-1/2 lg:pr-8 lg:text-left">
          <Typography
            variant="h2"
            font="Rubik"
            className="mb-2 text-5xl font-bold md:mb-4 md:text-6xl"
          >
            <span className="text-black">{aboutTitle} </span>
            <span className="font-bagnard text-purple-600">{title}</span>
          </Typography>

          <Typography
            font="Rubik"
            variant="p"
            className="text-justify text-sm text-gray-800 md:text-xl lg:text-2xl"
          >
            {normalContent} {boldContent}
          </Typography>

          <div className="pt-2">
            <Button
              variant="gradient-yellow"
              size="base"
              className="w-full p-2 text-xl lg:w-auto lg:p-4 lg:text-2xl"
              onClick={handleDownload}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Implementation */}
      <Lightbox
        open={open}
        plugins={[Zoom]}
        zoom={{ ref: zoomRef }}
        slides={[{ src: "/images" + poster }]} // Use the poster URL as the slide source
        close={() => setOpen(false)}
        render={{ buttonNext: () => null, buttonPrev: () => null }}
      />
    </>
  );
}
