"use client";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Button from "@/components/buttons/Button";
import { AboutEventProps } from "@/types/event-page";

export default function AboutEvent({
  aboutTitle,
  buttonText,
  title,
  normalContent,
  boldContent,
  poster,
}: AboutEventProps) {
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
      <section className="container w-full min-h-screen mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center my-8 md:my-16">
        {/* Image Section*/}
        <div className="relative w-fit h-full rounded-3xl flex justify-center items-center">
          <NextImage
            src={poster}
            alt={title}
            width={424}
            height={524}
            className="w-full h-full flex justify-center items-center z-0"
            imgClassName="rounded-3xl object-cover w-full h-full lg:h-[832px] lg:max-w-[424px]"
          />
          <div className="absolute top-0 left-0 size-full opacity-40 bg-gradient-to-b from-neutral-100 to-[#B20000] h-full z-10 rounded-3xl" />
        </div>
        {/* Content Section */}
        <div className="lg:w-1/2 h-full space-y-3 text-center lg:text-left px-4 lg:pr-8">
          <Typography
            variant="h2"
            font="Rubik"
            className="text-5xl md:text-6xl font-bold mb-2 md:mb-4"
          >
            <span className="text-black">{aboutTitle} </span>
            <span className="text-purple-600 font-bagnard">{title}</span>
          </Typography>

          <Typography
            font="Rubik"
            variant="p"
            className="text-sm md:text-xl lg:text-2xl text-gray-800 text-justify"
          >
            {normalContent}
            <strong> {boldContent}</strong>
          </Typography>

          <div className="pt-2 ">
            <Button
              variant="gradient-yellow"
              size="base"
              className="text-xl lg:text-2xl w-full lg:w-auto p-2 lg:p-4"
              onClick={handleDownload}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
