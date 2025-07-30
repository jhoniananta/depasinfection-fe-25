"use client";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Sidebar from "@/layouts/SidebarUser";

import Countdown from "@/components/Countdown";
import withAuth from "@/components/WithAuth";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import BioInformationSection from "../_components/BioInformation";
import PaymentInformationSection from "../_components/PaymentInformation";
import { useGetDetailsEventQuery } from "../_hooks/@get/useGetDetailsEvent";

export default withAuth(OKGDDashboardUserPage, "USER");

function OKGDDashboardUserPage() {
  // Data Fetching Details Event Query
  const { data: eventDetails, isLoading, isError } = useGetDetailsEventQuery();

  // phaseDetails content rendering
  const phaseDetails = eventDetails?.[0].phase;

  // Function to check if current time is after 5 PM today
  const isDownloadTimeReached = () => {
    const now = new Date();
    const today5PM = new Date();
    today5PM.setHours(18, 0, 0, 0); // Set to 5 PM today
    return now >= today5PM;
  };

  // Function to generate and download student card PDF
  const downloadStudentCard = () => {
    if (!eventDetails?.[0]) return;

    const participant = eventDetails[0];
    const doc = new jsPDF();

    // Set font
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    // Title
    doc.text("STUDENT CARD", 105, 30, { align: "center" });
    doc.text("OKGD 2025", 105, 45, { align: "center" });

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 55, 190, 55);

    // Student Information
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const yStart = 70;
    const lineHeight = 15;
    let currentY = yStart;

    // Moodle Access Information
    doc.setFont("helvetica", "bold");
    doc.text("MOODLE ACCESS INFORMATION:", 20, currentY);
    currentY += lineHeight;

    doc.setFont("helvetica", "normal");
    doc.text(`Moodle Account: ${participant.moodle_account}`, 20, currentY);
    currentY += lineHeight;

    doc.text(
      `Temporary Password: ${participant.moodle_password}`,
      20,
      currentY,
    );
    currentY += lineHeight + 10;

    // Important Notice
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 0, 0); // Red color
    doc.text("IMPORTANT NOTICE:", 20, currentY);
    currentY += lineHeight;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Black color

    const noticeText = [
      "Please change your password immediately when you first log in to Moodle.",
      "This temporary password is for initial access only and must be updated",
      "for security purposes. Keep your new password secure and do not share",
      "it with anyone.",
    ];

    noticeText.forEach((line) => {
      doc.text(line, 20, currentY);
      currentY += 10;
    });

    // Footer
    currentY += 20;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.text("Generated on: " + new Date().toLocaleString(), 20, currentY);
    doc.text("Valid for OKGD 2025 Event Only", 20, currentY + 10);

    // Save the PDF
    const fileName = `OKGD_StudentCard_${participant.team_name.replace(/\s+/g, "_")}_${new Date().getTime()}.pdf`;
    doc.save(fileName);
  };

  const phaseContent = {
    PENYISIHAN: {
      content:
        "Welcome to all the amazing participants! The preliminary round is the first step in your journey. May you give your best and enjoy every moment of the process. Wishing you all the best of luck!",
    },
    PEREMPATFINAL: {
      content:
        "Congratulations to you for making it to the quarterfinals! Your journey is getting closer to the peak, and the challenges ahead are even greater. Keep up the hard work, and showcase your best abilities in this round!",
    },
    SEMIFINAL: {
      content:
        "Welcome to the semifinals! You've shown incredible dedication to get this far. Don't waste this opportunity stay focused and give your best performance in this stage.",
    },
    FINAL: {
      content:
        "Congratulations to you for making it to the finals! This is the culmination of all the effort and dedication you've put in. No matter the outcome, you have already shown great excellence. Wishing you success, and may you enjoy every moment!",
    },
  };

  return (
    <>
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
                        , welcome to your dashboard!
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
                        ) : eventDetails?.[0].status === "APPROVED" ? (
                          phaseDetails === "PENYISIHAN" ? (
                            <>{phaseContent.PENYISIHAN.content}</>
                          ) : phaseDetails === "PEREMPATFINAL" ? (
                            <>{phaseContent.PEREMPATFINAL.content}</>
                          ) : phaseDetails === "SEMIFINAL" ? (
                            <>{phaseContent.SEMIFINAL.content}</>
                          ) : phaseDetails === "FINAL" ? (
                            <>{phaseContent.FINAL.content}</>
                          ) : (
                            <></>
                          )
                        ) : eventDetails?.[0].status === "REVISION" ? (
                          <>
                            <span className="text-red-600">
                              Please Revised !
                            </span>
                            <br />
                            {eventDetails?.[0].revision_message}
                          </>
                        ) : (
                          <>
                            <span className="text-red-600">Rejected !</span>
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
                      <Countdown endDate="2025-07-13T00:00:00" />
                      <div className="flex w-full items-center justify-center gap-4 md:mt-4">
                        <Link
                          href="https://drive.google.com/drive/folders/1Uj_JL8vU0F2hVwvT7PZdEKk5GB3e11Nq"
                          target="_blank"
                          className="flex-1"
                        >
                          <Button
                            className="w-full"
                            disabled={isError}
                            variant="purple"
                          >
                            Guidebook
                          </Button>
                        </Link>
                        <Link
                          href="https://drive.google.com/drive/folders/1qxpS75ie9fiSRHUtTlkSbKMX3v6SqCNP"
                          target="_blank"
                          className="flex-1"
                        >
                          <Button
                            className="w-full"
                            disabled={isError}
                            variant="outlinePurple"
                          >
                            Syllabus
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
                            Registration
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
                            Administration
                          </Typography>
                          <Typography
                            className={`text-[20px] font-bold leading-[24px] ${
                              eventDetails?.[0].status === "PENDING"
                                ? "text-purple-900"
                                : eventDetails?.[0].status === "REVISION"
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
                              : eventDetails?.[0].status === "REVISION"
                                ? "Please Revised"
                                : eventDetails?.[0].status === "REJECTED"
                                  ? "Rejected"
                                  : eventDetails?.[0].status === "APPROVED"
                                    ? "Verified"
                                    : ""}
                          </Typography>
                        </div>
                      </div>
                      {/* Download Student card after status === verified*/}
                      {eventDetails?.[0].status === "APPROVED" && (
                        <div className="flex w-full flex-col gap-0">
                          <Typography
                            className="mb-[9px] text-left text-[16px] font-medium leading-[16px] text-[#A8A9AC] lg:text-right"
                            weight="medium"
                          >
                            {isDownloadTimeReached()
                              ? "Student card is now available for download"
                              : "Student card will be available at 5 PM today"}
                          </Typography>
                          <Button
                            variant="outlinePurple"
                            className="flex items-center justify-center gap-4 text-xs lg:ml-auto lg:text-lg"
                            disabled={!isDownloadTimeReached() || isLoading}
                            onClick={downloadStudentCard}
                          >
                            <FiDownload className="text-xs lg:text-lg" />
                            Download Student Card
                          </Button>
                        </div>
                      )}
                    </div>
                    {/* Button download student card */}

                    {eventDetails?.[0].status === "REVISION" && (
                      <div className="my-[4px]">
                        <Typography
                          className="text-[16px] font-medium leading-[16px] text-[#A8A9AC]"
                          weight="medium"
                        >
                          Reason
                        </Typography>
                        <Typography
                          className={`text-[20px] font-bold leading-[24px] ${
                            eventDetails?.[0].status === "REVISION"
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
                    {eventDetails?.[0].status === "REVISION" && (
                      <div className="my-[4px] flex flex-col gap-2">
                        <Typography
                          className="text-[16px] font-medium leading-[16px] text-[#A8A9AC]"
                          weight="medium"
                        >
                          Revised at
                        </Typography>
                        <Link
                          href={`/dashboard/okgd/update/${eventDetails?.[0].participant_id}`}
                        >
                          <Button
                            size="lg"
                            className="w-full bg-yellow-900 px-4 py-2 text-white md:w-[182px]"
                          >
                            Revision
                          </Button>
                        </Link>
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
    </>
  );
}
