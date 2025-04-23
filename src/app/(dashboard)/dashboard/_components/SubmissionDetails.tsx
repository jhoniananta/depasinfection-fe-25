"use client";

import PdfPreview from "@/components/PdfPreview";
import Typography from "@/components/Typography";

import { EventDetails } from "@/types/dashboard-user";

interface SubmissionDetailsSectionProps {
  eventDetails: EventDetails;
}

export default function SubmissionDetailsSection({
  eventDetails,
}: SubmissionDetailsSectionProps) {
  if (!eventDetails?.[0]) return null;

  const data = eventDetails[0];
  const eventName = data.event;

  const isUDSRC = eventName === "UGM Dental Scientific Research Competition";

  return (
    <section className="mx-auto mt-4 w-full max-w-5xl p-6 sm:px-16 xl:p-0">
      <div className="w-full rounded-2xl bg-purple-50 p-6 px-4 shadow-md sm:px-6">
        {/* Title */}
        <div className="mb-4">
          <Typography variant="h6" weight="bold" className="text-lg">
            Submission{" "}
            <span className="font-bagnard text-purple-600">Details</span>
          </Typography>
        </div>
        <div className="flex h-fit flex-col gap-6">
          {/* Integrity Pact - outside the accordion */}
          <div className="">
            {isUDSRC &&
            data.submission_status &&
            data.sub_competition === "POSTER" ? (
              <PdfPreview
                title="Poster (click for detail)"
                src={data.submission_details?.poster || ""}
                className="min-h-[110px]"
              />
            ) : (
              <PdfPreview
                title="Abstract (click for detail)"
                src={data.submission_details?.abstract || ""}
                className="min-h-[110px]"
              />
            )}
          </div>

          {data.submission_details?.description && (
            <div className="flex flex-col">
              <Typography variant="p" weight="bold">
                Description
              </Typography>
              <Typography
                className="text-justify text-[15px] leading-[20px] text-[#141414]"
                weight="regular"
              >
                {data.submission_details?.description}
              </Typography>
            </div>
          )}

          <PdfPreview
            title="Validation Sheet (click for detail)"
            src={data.submission_details?.validation_sheet || ""}
            className="min-h-[110px]"
          />
        </div>
      </div>
    </section>
  );
}
