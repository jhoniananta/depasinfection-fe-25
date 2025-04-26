"use client";

import withAuth from "@/components/WithAuth";
import Sidebar from "@/layouts/SidebarAdmin";
import { ParticipantDetailsChangeRequest } from "@/types/dashboard-admin";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPencilSquare } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useChangeStatusUDSRC } from "../../_hooks/@put/useChangeStatus";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import BioInformationSectionAdmin from "../../_components/BioInformation";
import PaymentInformationSectionAdmin from "../../_components/PaymentInformation";

import { useGetDetailParticipantQuery } from "../../_hooks/@get/useAdmin";

import LoadingGlobalPage from "@/app/loading";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import DialogConfirm from "../../_components/DialogConfirm";
import SubmissionDetailsSectionAdmin from "../../_components/SubmissionDetailsSection";

export default withAuth(DetailUDSRCUser, "ADMIN");
function DetailUDSRCUser() {
  const router = useRouter();
  const [status, setStatus] = React.useState<string>("");

  const [openDialogAccept, setOpenDialogAccept] = React.useState(false);
  const [openDialogReject, setOpenDialogReject] = React.useState(false);
  const [openDialogRevision, setOpenDialogRevision] = React.useState(false);

  const {
    data: eventDetails,
    isLoading,
    isError,
  } = useGetDetailParticipantQuery();

  const changeStatusMutation = useChangeStatusUDSRC();
  const methods = useForm<ParticipantDetailsChangeRequest>({
    mode: "onTouched",
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ParticipantDetailsChangeRequest> = (data) => {
    changeStatusMutation.mutate({
      data: {
        status: status,
        message: data.message === "" ? " " : data.message,
      },
    });
  };

  // Handle status change function to open Modal
  const handleStatusChange = (status: string) => {
    setStatus(status);
    if (status === "APPROVED") {
      setOpenDialogAccept(true);
    } else if (status === "REJECTED") {
      setOpenDialogReject(true);
    } else if (status === "REVISION") {
      setOpenDialogRevision(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingGlobalPage />
      ) : (
        <Sidebar title="UDSRC Admin Details Participant">
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
                          UDSRC Dashboard Details!
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
            {/* Team Action Section */}
            {eventDetails && (
              <div className="container my-9 mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      className="text-olive-900 h-[40px] w-[40px] bg-gradient-to-r from-amber-300 to-yellow-400 text-2xl font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500"
                      onClick={() => router.back()}
                    >
                      <FaArrowLeft />
                    </Button>
                    <Typography
                      variant="h6"
                      weight="bold"
                      className="text-lg text-black"
                    >
                      {eventDetails?.team_name ?? "Team Name"}
                    </Typography>
                  </div>
                  <Typography variant="p" weight="bold" className="text-sm">
                    {eventDetails?.university ?? "School Name"}
                  </Typography>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleStatusChange("APPROVED")}
                    className="flex items-center gap-2 rounded-lg bg-[#245D77] px-4 py-2 text-white transition hover:bg-[#1a455a]"
                  >
                    <TiTick className="text-lg" />
                    <Typography
                      variant="p"
                      weight="bold"
                      className="text-sm text-white"
                    >
                      Accept
                    </Typography>
                  </button>
                  <button
                    onClick={() => handleStatusChange("REVISION")}
                    className="flex items-center gap-2 rounded-lg bg-[#FCE94B] px-4 py-2 text-black transition hover:bg-[#e3d940]"
                  >
                    <BsPencilSquare className="text-lg" />
                    <Typography
                      variant="p"
                      weight="bold"
                      className="text-sm text-black"
                    >
                      Revision
                    </Typography>
                  </button>
                  <button
                    onClick={() => handleStatusChange("REJECTED")}
                    className="flex items-center gap-2 rounded-lg bg-[#874CCC] px-4 py-2 text-white transition hover:bg-[#6f38a3]"
                  >
                    <IoCloseCircleOutline className="text-lg" />
                    <Typography
                      variant="p"
                      weight="bold"
                      className="text-sm text-white"
                    >
                      Reject
                    </Typography>
                  </button>
                </div>
              </div>
            )}

            {/* Accept Dialog */}
            {openDialogAccept && (
              <DialogConfirm
                open={openDialogAccept}
                setOpen={setOpenDialogAccept}
                onConfirm={() => {
                  handleSubmit(onSubmit)();
                }}
                title="Accept Participant"
                description="Are you sure you want to accept this participant?"
              />
            )}

            {/* Reject Dialog */}
            {openDialogReject && (
              <DialogConfirm
                open={openDialogReject}
                setOpen={setOpenDialogReject}
                onConfirm={() => {
                  handleSubmit(onSubmit)();
                }}
                title="Reject Participant"
                description="Are you sure you want to reject this participant?"
              />
            )}

            {/* Revision Dialog (with textarea input) */}
            {openDialogRevision && (
              <DialogConfirm
                open={openDialogRevision}
                setOpen={setOpenDialogRevision}
                onConfirm={() => {
                  handleSubmit(onSubmit)();
                }}
                withInput
                inputLabel="Revision Reason"
                register={methods.register("message")}
                title="Request Revision"
                description="Please provide the reason for revision."
              />
            )}

            {/* Content Section */}
            <div className="flex h-auto w-auto flex-col xl:gap-10">
              {isError ? (
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
                    className="text-center text-lg text-gray-600"
                  >
                    Data not found!
                  </Typography>
                </div>
              ) : (
                <>
                  <BioInformationSectionAdmin eventDetails={eventDetails} />
                  {eventDetails?.status === "APPROVED" &&
                    eventDetails?.submission_status === true &&
                    eventDetails?.submission_details && (
                      <SubmissionDetailsSectionAdmin
                        eventDetails={eventDetails}
                      />
                    )}
                  <PaymentInformationSectionAdmin eventDetails={eventDetails} />
                </>
              )}
            </div>
          </section>
        </Sidebar>
      )}
    </>
  );
}
