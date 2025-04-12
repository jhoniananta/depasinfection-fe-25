"use client";

import withAuth from "@/components/WithAuth";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Sidebar from "@/layouts/SidebarUser";

import LoadingGlobalPage from "@/app/loading";
import Countdown from "@/components/Countdown";
import withAuth from "@/components/WithAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import BioInformationSection from "../_components/BioInformation";
import PaymentInformationSection from "../_components/PaymentInformation";
import { useGetDetailsEventQuery } from "../_hooks/@get/useGetDetailsEvent";

function OKGDDashboardUserPage() {
  // Data Fetching Details Event Query
  const { data: eventDetails, isLoading, isError } = useGetDetailsEventQuery();
  return (
    <>
      {isLoading ? (
        <LoadingGlobalPage />
      ) : (
        <Sidebar title="Dashboard OKGD">
          <section className="min-h-screen w-full overflow-hidden">
            {/* Title Section */}
            <div className="relative z-0 mb-[5vh] bg-neutral-50 md:max-h-[283px]">
              <div className="relative h-full w-full">
                <div className="flex h-full w-full justify-end sm:justify-between">
                  <div className="block w-full pt-4 md:pt-8">
                    <div className="flex h-full w-full flex-col items-start justify-center">
                      <div className="pl-6">
                        {/* Hero Typography Start */}
                        <Typography
                          variant="p"
                          weight="bold"
                          className="mb-1 text-[16px] text-gray-600"
                        >
                          Hi,{" "}
                          {
                            eventDetails?.[0].team_details.leader_details.name.split(
                              " ",
                            )[0]
                          }
                          , selamat datang di dashboard
                        </Typography>{" "}
                        <Typography
                          variant="h5"
                          weight="bold"
                          className="text-2xl leading-none"
                        >
                          {eventDetails?.[0].event}
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
            <div className="flex h-auto w-auto flex-col xl:gap-10">
              <div className="flex flex-col items-center justify-center xl:w-[957px] xl:flex-row xl:gap-7">
                {/* What's Happening Section*/}
                <div className="w-full p-6 sm:px-16 xl:p-0">
                  <div className="flex h-auto w-full items-center justify-center rounded-[24px] bg-purple-50 px-6 pb-6 pt-4 shadow-md sm:px-12 sm:pb-10 xl:min-h-[339px] xl:max-w-[470px] xl:px-[40px] xl:py-[32px]">
                    <div className="flex h-full flex-col items-start justify-center">
                      <div className="mb-4 flex items-center">
                        <Typography
                          className="text-[20px] font-bold leading-[24px] text-[#141414]"
                          weight="bold"
                          variant="h6"
                        >
                          What&apos;s
                        </Typography>
                        <Typography
                          className="ml-1 font-bagnard text-[24px] font-normal text-purple-600"
                          weight="regular"
                          variant="h6"
                        >
                          Happening?
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          className="text-justify text-[15px] leading-[20px] text-[#141414]"
                          weight="regular"
                        >
                          {eventDetails?.[0].status === "PENDING" ? (
                            "Congratulations! You are now registered for OKGD. Our admin team is currently verifying your account. Stay tuned!"
                          ) : (
                            <>
                              <span className="text-purple-600">
                                Congratulations!
                              </span>
                              {
                                " ✨ Congratulations! You have successfully become a participant of the Dentistry Olympiad. Please make sure to read the Guidebook and Syllabus that will be  provided."
                              }
                            </>
                          )}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Countdown Event Section */}
                <div className="w-full p-6 sm:px-16 xl:p-0">
                  <div className="flex h-auto w-full items-center justify-center rounded-[24px] bg-purple-50 px-6 pb-6 pt-4 shadow-md sm:px-12 sm:pb-10 xl:min-h-[339px] xl:max-w-[520px] xl:px-[40px] xl:py-[32px]">
                    <div className="flex h-full flex-col items-center justify-start">
                      <div className="flex items-center justify-center align-middle">
                        <Typography
                          className="text-[20px] font-bold leading-[24px] text-[#141414]"
                          weight="bold"
                          variant="h6"
                        >
                          Event
                        </Typography>
                        <Typography
                          className="ml-1 font-bagnard text-[24px] font-normal text-purple-600"
                          weight="regular"
                          variant="h6"
                        >
                          Started In
                        </Typography>
                      </div>
                      <div className="mt-2 flex flex-col items-center justify-center gap-4">
                        <Countdown endDate="2025-07-14T23:59:59" />
                        <div className="flex w-full items-center justify-center gap-4 md:mt-4">
                          <Link href="/Guidebook" className="flex-1">
                            <Button
                              className="w-full"
                              disabled={isError}
                              variant="purple"
                            >
                              Guidebook
                            </Button>
                          </Link>
                          <Link href="/silabus" className="flex-1">
                            <Button
                              className="w-full"
                              disabled={isError}
                              variant="outlinePurple"
                            >
                              Silabus
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Activity status Section */}
              <div className="p-6 sm:px-16 xl:p-0">
                <div className="rounded-[24px] bg-purple-50 px-6 pb-6 pt-4 shadow-md">
                  <div className="flex flex-col items-start justify-start gap-8 xl:flex-row xl:items-center">
                    <div className="h-auto w-full px-4 py-2 xl:py-8">
                      <div className="mb-4 flex items-center">
                        <Typography
                          className="text-[20px] font-bold leading-[24px] text-[#141414]"
                          weight="bold"
                          variant="h6"
                        >
                          Activity
                        </Typography>
                        <Typography
                          className="ml-1 font-bagnard text-[24px] font-normal text-purple-600"
                          weight="regular"
                          variant="h6"
                        >
                          Status
                        </Typography>
                      </div>
                      <div className="flex w-full flex-col gap-4 lg:flex-row">
                        <div className="flex w-full flex-grow flex-col gap-4 lg:flex-row lg:gap-8">
                          <div>
                            <Typography
                              className="mb-[9px] text-[16px] font-medium leading-[16px] text-[#A8A9AC]"
                              weight="medium"
                            >
                              Status Registrasi
                            </Typography>
                            <Typography
                              className="text-[20px] font-bold leading-[24px] text-blue-700"
                              weight="bold"
                            >
                              {isLoading ? "loading..." : "Registered"}
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              className="mb-[9px] text-[16px] font-medium leading-[16px] text-[#A8A9AC]"
                              weight="medium"
                            >
                              Status Administrasi
                            </Typography>
                            <Typography
                              className={`text-[20px] font-bold leading-[24px] ${
                                eventDetails?.[0].status === "PENDING"
                                  ? "text-purple-900"
                                  : eventDetails?.[0].revision_status
                                    ? "text-yellow-900"
                                    : eventDetails?.[0].status === "REJECTED"
                                      ? "text-red-900"
                                      : "text-blue-700"
                              }`}
                              weight="bold"
                            >
                              {isLoading && "loading..."}
                              {eventDetails?.[0].status === "PENDING"
                                ? "Not Verified"
                                : eventDetails?.[0].revision_status
                                  ? "Please Revised"
                                  : eventDetails?.[0].status === "REJECTED"
                                    ? "Rejected"
                                    : eventDetails?.[0].status === "VERIFIED"
                                      ? "Verified"
                                      : ""}
                            </Typography>
                          </div>
                        </div>
                        <Button
                          variant="outlinePurple"
                          className="flex items-center justify-center gap-4 text-xs lg:ml-auto lg:text-lg"
                        >
                          <FiDownload className="text-xs lg:text-lg" />
                          Download Student Card
                        </Button>
                      </div>
                      {/* Button download student card */}

                      {(eventDetails?.[0].revision_status ||
                        eventDetails?.[0].status === "REJECTED") && (
                        <div className="my-[4px]">
                          <Typography
                            className="text-[16px] font-medium leading-[16px] text-[#A8A9AC]"
                            weight="medium"
                          >
                            Alasan
                          </Typography>
                          <Typography
                            className={`mt-[9px] text-[20px] font-bold leading-[24px] ${
                              eventDetails?.[0].revision_status
                                ? "text-yellow-900"
                                : "text-red-900"
                            }`}
                            weight="bold"
                          >
                            {isLoading && "loading..."}
                            {eventDetails?.[0].revision_message}
                          </Typography>
                        </div>
                      )}
                      {eventDetails?.[0].revision_status && (
                        <div className="my-[4px] flex flex-col gap-2">
                          <Typography
                            className="text-[16px] font-medium leading-[16px] text-[#A8A9AC]"
                            weight="medium"
                          >
                            Lakukan Revisi Pada
                          </Typography>
                          <Button
                            size="lg"
                            className="w-full bg-yellow-900 px-4 py-2 text-white md:w-[182px]"
                          >
                            Revisi
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <BioInformationSection eventDetails={eventDetails} />
              <PaymentInformationSection eventDetails={eventDetails} />
            </div>
          </section>
        </Sidebar>
      )}
    </>
  );
}

export default withAuth(OKGDDashboardUserPage, "all");
