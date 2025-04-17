"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";

import withAuth from "@/components/WithAuth";

import Sidebar from "@/layouts/SidebarAdmin";
import CardAdmin from "./_components/CardAdmin";

export default withAuth(DashboardAdminPage, "ADMIN");
function DashboardAdminPage() {
  return (
    <>
      <Sidebar title="Dashboard Admin">
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
                        Hi, Admin
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
            <>
              <div className="flex h-full w-[276px] flex-col justify-center gap-4">
                <Typography
                  variant="p"
                  weight="bold"
                  className="text-center text-[18px] text-gray-500 md:text-[22px]"
                >
                  Check This dashboard
                </Typography>
              </div>
              <div className="flex h-auto w-full items-center justify-center">
                <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-12 lg:items-end">
                  <CardAdmin
                    src="/landing-page/bg-card-okgd.png"
                    title="okgd"
                    subtitle="Olimpiade Kedokteran Gigi Dasar"
                    urlLink="/admin/okgd"
                  />
                  <CardAdmin
                    src="/landing-page/bg-card-udsrc.png"
                    title="udsrc"
                    subtitle="UGM Dental Student Research Competition"
                    urlLink="/admin/udsrc"
                  />
                </div>
              </div>
            </>
          </div>
        </section>
      </Sidebar>
    </>
  );
}
