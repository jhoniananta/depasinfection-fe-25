"use client";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";

type CardProps = {
  src: string;
  title: string;
  subtitle: string;
  urlLink?: string;
};

export default function RegisterCard({
  src,
  title,
  subtitle,
  urlLink,
}: CardProps) {
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);

  useEffect(() => {
    const checkLinkStatus = () => {
      const now = new Date();
      const targetDate = new Date(2025, 6, 13);

      // Check if it's July 13, 2025
      if (
        now.getFullYear() === targetDate.getFullYear() &&
        now.getMonth() === targetDate.getMonth() &&
        now.getDate() === targetDate.getDate()
      ) {
        const currentHour = now.getHours();
        // Disable between 1 AM (01:00) and 3 PM (15:00)
        setIsLinkDisabled(currentHour >= 1 && currentHour < 15);
      } else {
        setIsLinkDisabled(false);
      }
    };

    // Check immediately
    checkLinkStatus();

    // Check every minute
    const interval = setInterval(checkLinkStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative h-full max-h-[480px] min-h-[360px] w-full min-w-[272px] max-w-[424px] overflow-hidden rounded-3xl">
        <NextImage
          src={src}
          alt={title}
          width={424}
          height={480}
          className="rounded-3xl object-cover"
          priority
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-10">
          <Typography
            variant="h1"
            weight="extrabold"
            className="relative text-center text-[64px] uppercase text-white"
          >
            {title}
            <span className="block text-[24px] font-medium leading-tight">
              {subtitle}
            </span>
          </Typography>
          {urlLink ? (
            <Link
              href={isLinkDisabled ? "#" : urlLink}
              className={`mt-4 w-full rounded-xl border-2 border-solid border-white bg-transparent p-2 text-center text-[18px] text-white md:text-[24px] ${
                isLinkDisabled
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              {isLinkDisabled ? "Pendaftaran Ditutup" : "Register"}
            </Link>
          ) : (
            <Link
              href={`/dashboard/${title}`}
              className="mt-4 w-full rounded-xl border-2 border-solid border-white bg-transparent p-2 text-center text-[18px] text-white hover:bg-white hover:text-black md:text-[24px]"
            >
              Go to dashboard
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
