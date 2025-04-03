"use client";

import withAuth from "@/components/WithAuth";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";

import Sidebar from "@/layouts/SidebarUser";
import RegisterCard from "./_components/RegisterCard";

function DashboardUserPage() {
  return (
    <>
      <Sidebar title="Dashboard">
        <section className="min-h-screen w-full overflow-hidden">
          {/* Title Section */}
          <div className="relative z-0 bg-neutral-50 md:max-h-[283px]">
            <div className="relative h-full w-full">
              <div className="flex h-full w-full justify-end sm:justify-between">
                <div className="block w-full pt-4 md:pt-8">
                  <div className="flex h-full w-full flex-col items-start justify-center">
                    <div className="pl-6">
                      {/* Hero Typography Start */}
                      <Typography
                        variant="p"
                        weight="bold"
                        className="mb-1 text-[20px] text-gray-600"
                      >
                        Hi, Name
                      </Typography>{" "}
                      <Typography
                        variant="h4"
                        weight="bold"
                        className="text-2xl leading-none"
                      >
                        Welcome to your dashboard!
                      </Typography>
                    </div>
                    {/* Hero Typography End */}
                  </div>
                </div>
                <div className="hidden h-full w-[70%] items-center justify-center sm:flex">
                  <NextImage
                    alt="hero"
                    width={992}
                    height={283}
                    src="/dashboard/hero-desktop.png"
                    className="h-full w-full object-none"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Content Section */}
          <div className="container my-6 flex w-full max-w-3xl flex-col items-center justify-center gap-[60px] md:my-9 xl:max-w-5xl">
            {/* Not registered to other event */}
            <div className="flex h-[198px] w-[276px] flex-col justify-center gap-4 md:h-[216px]">
              <Typography
                variant="h1"
                weight="bold"
                className="text-center text-[120px] leading-[120%] md:text-[120px] md:leading-[120%]"
              >
                ?
              </Typography>
              <Typography
                variant="p"
                weight="bold"
                className="text-center text-[18px] text-gray-500 md:text-[22px]"
              >
                You have not registered for any competitions
              </Typography>
            </div>
            <div className="flex h-auto w-full flex-col items-center justify-center gap-3 md:gap-5">
              <Typography
                variant="h6"
                weight="bold"
                className="text-center text-[16px]"
              >
                Register yourself for the following competitions!
              </Typography>
              <div className="lg:gap-18 relative mt-10 flex h-full w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-end">
                {/* OKGD Card */}
                <RegisterCard
                  src="/landing-page/bg-card-okgd.png"
                  title="OKGD"
                  subtitle="Olimpiade Kedokteran Gigi Dasar"
                  urlLink="/event-register/okgd"
                />
                {/* UDSRC Card */}
                <RegisterCard
                  src="/landing-page/bg-card-udsrc.png"
                  title="UDSRC"
                  subtitle="UGM Dental Student Research Competition"
                  urlLink="/event-register/udsrc"
                />
              </div>
            </div>
            {/* Integrasi setelah ada event di Home */}
            <div className="hidden">Test</div>
          </div>
        </section>
      </Sidebar>
    </>
  );
}

export default withAuth(DashboardUserPage, "all");
