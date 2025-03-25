"use client";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";

type CardProps = {
  src: string;
  title: string;
  subtitle: string;
};

export default function CardEvent({ src, title, subtitle }: CardProps) {
  return (
    <>
      <div className="relative min-w-[272px] min-h-[360px] max-w-[424px] max-h-[480px] w-full h-full rounded-3xl overflow-hidden group cursor-pointer transition-transform duration-100 hover:scale-105">
        <NextImage
          src={src}
          alt={title}
          width={424}
          height={480}
          className="object-cover rounded-3xl"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
          <Typography
            variant="h1"
            weight="extrabold"
            className="text-white text-[64px] relative text-center"
          >
            {title}
            <span className="text-[24px] block leading-tight font-medium">
              {subtitle}
            </span>
          </Typography>
        </div>
      </div>
    </>
  );
}
