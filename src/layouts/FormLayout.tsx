import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { ReactNode } from "react";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface FormLayoutProps {
  children: ReactNode;
  heroImage: ImageProps;
  title: string;
  subtitle: string;
}

export default function FormLayout({
  children,
  heroImage,
  title,
  subtitle,
}: FormLayoutProps) {
  return (
    <section className="flex h-screen flex-col lg:flex-row">
      <div className="relative h-[274px] w-full lg:h-screen lg:w-1/2">
        <NextImage
          width={heroImage.width}
          height={heroImage.height}
          className="w-screen"
          imgClassName="w-screen object-cover h-[274px] lg:w-1/2 lg:h-screen"
          src={heroImage.src}
          alt={heroImage.alt}
          priority
        />
        <div className="container absolute top-0 flex h-[274px] w-full flex-col items-start justify-end py-8 lg:h-full">
          <NextImage
            serverStaticImg
            width={312}
            height={68}
            className="mb-2 flex w-[153px]"
            src="/images/ugm-logo.png"
            alt="auth-ugm-logo"
          />
          <Typography
            variant="h4"
            font="Bagnard"
            className="flex w-fit text-[24px] text-neutral-50 lg:text-[48px]"
          >
            {title}
          </Typography>
          <Typography
            variant="p"
            font="Rubik"
            className="flex w-fit text-[12px] text-neutral-50"
          >
            {subtitle}
          </Typography>
        </div>
      </div>
      <div className="scrollbar-gutter-stable container z-10 lg:h-screen lg:w-1/2 lg:overflow-y-auto">
        <div className="flex w-full flex-col items-center justify-center gap-4 py-8 lg:min-h-screen">
          {children}
        </div>
      </div>
    </section>
  );
}
