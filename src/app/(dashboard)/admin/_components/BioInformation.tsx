"use client";

import FilePreview from "@/components/FilePreview";
import PdfPreview from "@/components/PdfPreview";
import Typography from "@/components/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EventDetails,
  ParticipantDetails,
  teacherDetails,
} from "@/types/dashboard-admin";
import { countries } from "country-data-list";
import { Paperclip } from "lucide-react";

interface BioInformationSectionProps {
  eventDetails?: EventDetails;
}

export default function BioInformationSection({
  eventDetails,
}: BioInformationSectionProps) {
  if (!eventDetails) return null;

  const data = eventDetails;
  const leader = data.team_details?.leader_details;
  const members = data.team_details?.members_details || [];
  const teacher = data.teacher_details ? [data.teacher_details] : [];
  const eventName = data.event;

  const isUDSRC = eventName === "UGM Dental Scientific Research Competition";

  return (
    <section className="mx-auto mt-4 w-full max-w-5xl p-6 sm:px-16 xl:p-0">
      <div className="w-full rounded-2xl bg-purple-50 p-6 px-4 shadow-md sm:px-6">
        {/* Title */}
        <div className="mb-6">
          <Typography variant="h6" weight="bold" className="text-lg">
            Bio{" "}
            <span className="font-bagnard text-purple-600">Information</span>
          </Typography>
        </div>

        {/* Revision Message */}
        {data.revision_status && data.revision_message && (
          <div className="mb-4 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
            <Typography variant="p" weight="bold" className="mb-2 text-lg">
              Revision Message
            </Typography>
            <div className="flex items-center gap-2">
              <Paperclip size={16} />
              <Typography variant="p" weight="medium">
                {data.revision_message}
              </Typography>
            </div>
          </div>
        )}

        {/* Team + School */}
        <div className="flex flex-col gap-4 border-b border-gray-700 pb-4 md:flex-row">
          {/* Team Name */}
          <div className="flex flex-col">
            <Typography variant="p" weight="medium" className="text-gray-600">
              Team Name
            </Typography>
            <Typography variant="p" weight="bold">
              {data.team_name}
            </Typography>
          </div>

          {/* School or University Name */}
          <div className="flex flex-col md:ml-8">
            <Typography variant="p" weight="medium" className="text-gray-600">
              {isUDSRC ? "School" : "University"}
            </Typography>
            <Typography variant="p" weight="bold">
              {data.university}
            </Typography>
          </div>

          {isUDSRC && (
            <div className="flex flex-col md:ml-8">
              <Typography variant="p" weight="medium" className="text-gray-600">
                Nationality
              </Typography>
              <Typography variant="p" weight="bold">
                {countries.all.find(
                  (country) => country.alpha3 === data.nationality,
                )?.name || data.nationality}
              </Typography>
            </div>
          )}
        </div>

        {/* Integrity Pact - outside the accordion */}
        <div className="mt-4">
          {isUDSRC ? (
            <PdfPreview
              title="Statement Letter (click for detail)"
              src={data.statement_letter || ""}
              className="min-h-[110px]"
            />
          ) : (
            <PdfPreview
              title="Integrity Pact (click for detail)"
              src={data.integrity_pact || ""}
              className="min-h-[110px]"
            />
          )}
        </div>

        {/* Accordion for Leader + Members */}
        <Accordion type="multiple" className="mt-6 w-full">
          {/* Leader Accordion */}
          <AccordionItem value="leader">
            <AccordionTrigger className="text-xl font-bold">
              Leader Identity
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2">
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-10">
                  <div className="flex flex-col">
                    <Typography
                      className="text-sm text-gray-600"
                      weight="medium"
                    >
                      Name
                    </Typography>
                    <Typography
                      className="text-base font-bold text-black"
                      weight="bold"
                    >
                      {leader?.name}
                    </Typography>
                  </div>
                  <div className="flex flex-col">
                    <Typography
                      className="text-sm text-gray-600"
                      weight="medium"
                    >
                      Email
                    </Typography>
                    <Typography
                      className="text-base font-bold text-black"
                      weight="bold"
                    >
                      {leader?.email}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Typography className="text-sm text-gray-600" weight="medium">
                    WhatsApp
                  </Typography>
                  <Typography
                    className="border-b border-gray-500 text-base font-bold text-black"
                    weight="bold"
                  >
                    {leader?.phone_number}
                  </Typography>
                </div>
              </div>

              {/* Leader File Previews */}
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FilePreview
                  title="Student Card (click for detail)"
                  src={leader?.student_card || ""}
                  className="min-h-[110px]"
                />
                <FilePreview
                  title="Proof of Twibbon Posting (click for detail)"
                  src={leader?.twibbon || ""}
                  className="min-h-[110px]"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Member Accordions */}
          {members.map((member: ParticipantDetails, idx: number) => {
            const label = `Member ${idx + 1} Identity`;
            return (
              <AccordionItem
                key={member.participant_details_id}
                value={`member-${idx}`}
              >
                <AccordionTrigger className="text-xl font-bold">
                  {label}
                </AccordionTrigger>
                <AccordionContent>
                  {/* Member Identity */}
                  <div className="flex flex-col gap-2">
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-10">
                      <div className="flex flex-col">
                        <Typography
                          className="text-sm text-gray-600"
                          weight="medium"
                        >
                          Name
                        </Typography>
                        <Typography
                          className="text-base font-bold text-black"
                          weight="bold"
                        >
                          {member.name}
                        </Typography>
                      </div>
                      <div className="flex flex-col">
                        <Typography
                          className="text-sm text-gray-600"
                          weight="medium"
                        >
                          Email
                        </Typography>
                        <Typography
                          className="text-base font-bold text-black"
                          weight="bold"
                        >
                          {member.email}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <Typography
                        className="text-sm text-gray-600"
                        weight="medium"
                      >
                        WhatsApp
                      </Typography>
                      <Typography
                        className="border-b border-gray-500 text-base font-bold text-black"
                        weight="bold"
                      >
                        {member.phone_number}
                      </Typography>
                    </div>
                  </div>

                  {/* Member File Previews */}
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FilePreview
                      title="Student Card (click for detail)"
                      src={member.student_card || ""}
                      className="min-h-[110px]"
                    />
                    <FilePreview
                      title="Proof of Twibbon Posting (click for detail)"
                      src={member.twibbon || ""}
                      className="min-h-[110px]"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}

          {/* Teacher Accordions */}
          {!isUDSRC &&
            teacher.map((teacher: teacherDetails, idx: number) => {
              const label = `Teacher Identity`;
              return (
                <AccordionItem value={`teacher-${idx}`}>
                  <AccordionTrigger className="text-xl font-bold">
                    {label}
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Teacher Identity */}
                    <div className="flex flex-col gap-2">
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-10">
                        <div className="flex flex-col">
                          <Typography
                            className="text-sm text-gray-600"
                            weight="medium"
                          >
                            Name
                          </Typography>
                          <Typography
                            className="text-base font-bold text-black"
                            weight="bold"
                          >
                            {teacher.teacher_name}
                          </Typography>
                        </div>
                        <div className="flex flex-col">
                          <Typography
                            className="text-sm text-gray-600"
                            weight="medium"
                          >
                            Email
                          </Typography>
                          <Typography
                            className="text-base font-bold text-black"
                            weight="bold"
                          >
                            {teacher.teacher_email}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <Typography
                          className="text-sm text-gray-600"
                          weight="medium"
                        >
                          WhatsApp
                        </Typography>
                        <Typography
                          className="border-b border-gray-500 text-base font-bold text-black"
                          weight="bold"
                        >
                          {teacher.teacher_phone}
                        </Typography>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </div>
    </section>
  );
}
