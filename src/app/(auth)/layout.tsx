import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="h-screen flex flex-col lg:flex-row">
      <div className="h-[274px] w-full lg:w-1/2 lg:h-screen relative">
        <NextImage
          serverStaticImg
          width={1280}
          height={1096}
          className="w-screen "
          imgClassName="w-screen object-cover h-[274px] lg:w-1/2 lg:h-screen"
          src="/images/auth-hero-mobile.png"
          alt="auth-hero-mobile"
        />

        <div className="container  py-8 w-full  lg:h-full justify-end items-start flex top-0 h-[274px] absolute flex-col ">
          <NextImage
            serverStaticImg
            width={312}
            height={68}
            className="w-[153px] flex mb-2"
            src="/images/auth-ugm-logo.png"
            alt="auth-ugm-logo"
          />
          <Typography
            variant="h4"
            font="Bagnard"
            className="text-neutral-50 text-[48px] w-fit flex"
          >
            Depa's Infection
          </Typography>
          <Typography
            variant="p"
            font="Rubik"
            className=" text-neutral-50 text-[12px] w-fit flex"
          >
            Denta Paramitha's Science Festival and Competition FKG Universitas
            Gadjah Mada
          </Typography>
        </div>
      </div>
      <div className="container z-10 lg:w-1/2 lg:h-screen lg:overflow-y-auto scrollbar-gutter-stable">
        {children}
      </div>
    </section>
  );
}
