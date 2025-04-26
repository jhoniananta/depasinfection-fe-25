"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZodType } from "zod";

import Typography from "@/components/Typography";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { UDSRCsteps } from "@/contents/udsrc-register-content";
import FormLayout from "@/layouts/FormLayout";
import {
  getSessionStorageWithDefault,
  transformFormDataToPayloadUDSRC,
} from "@/lib/utils";
import {
  stepLeaderSchema,
  stepMembersSchema,
  stepPaymentSchema,
  stepTeamSchema,
} from "@/schemas/udsrc-update-schema";
import { UDSRCFormData } from "@/types/form";

import withAuth from "@/components/WithAuth";
import { UDSRCRegisterRequest } from "@/types/event-register";
import { useGetDetailsEventQuery } from "../../../_hooks/@get/useGetDetailsEvent";
import StepDone from "./_components/StepDone";
import StepLeader from "./_components/StepLeader";
import StepMembers from "./_components/StepMembers";
import StepPayment from "./_components/StepPayment";
import StepTeamInformation from "./_components/StepTeamInformation";
import { useUDSRCUpdateMutation } from "./_hooks/@put/useUDSRCUpdate";

const stepSchemas = [
  stepTeamSchema,
  stepLeaderSchema,
  stepMembersSchema,
  stepPaymentSchema,
];

const totalSteps = stepSchemas.length;

export default withAuth(RevisiUDSRC, "USER");
function RevisiUDSRC() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<Partial<UDSRCFormData>>({});
  const [isFormReady, setIsFormReady] = useState(false);
  const currentSchema = stepSchemas[activeStep];

  const { data: eventData, isLoading: isEventLoading } =
    useGetDetailsEventQuery();

  const form = useForm<Partial<UDSRCFormData>>({
    mode: "onChange",
    resolver: zodResolver(
      currentSchema as unknown as ZodType<Partial<UDSRCFormData>>,
    ),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (eventData && !isFormReady) {
      // Ambil object dari array
      const detail = eventData[0];

      // Map field API -> formData
      const defaults: Partial<UDSRCFormData> = {
        // Team Information
        teamName: detail.team_name,
        university: detail.university,
        nationality: detail.nationality,
        subCompetition:
          detail.sub_competition === "THREE_MOP"
            ? "3-minutes-oral-competition"
            : "poster-competition",
        statementLetter: getSessionStorageWithDefault(
          "statementLetter",
          detail.statement_letter,
        ),

        // Leader Information
        leaderName: detail.team_details.leader_details.name,
        leaderEmail: detail.team_details.leader_details.email,
        leaderNIK: detail.team_details.leader_details.nik,
        leaderNIM: detail.team_details.leader_details.nim,
        leaderWhatsApp: detail.team_details.leader_details.phone_number,
        leaderStudentCard: getSessionStorageWithDefault(
          "leaderStudentCard",
          detail.team_details.leader_details.student_card ?? "",
        ),
        leaderTwibbonProof: getSessionStorageWithDefault(
          "leaderTwibbonProof",
          detail.team_details.leader_details.twibbon ?? "",
        ),

        // Members information
        member1Name: detail.team_details.members_details[0]?.name,
        member1Email: detail.team_details.members_details[0]?.email,
        member1NIK: detail.team_details.members_details[0]?.nik ?? undefined,
        member1NIM: detail.team_details.members_details[0]?.nim ?? undefined,
        member1WhatsApp: detail.team_details.members_details[0]?.phone_number,
        member1StudentCard: getSessionStorageWithDefault(
          "member1StudentCard",
          detail.team_details.members_details[0]?.student_card,
        ),
        member1TwibbonProof: getSessionStorageWithDefault(
          "member1TwibbonProof",
          detail.team_details.members_details[0]?.twibbon,
        ),
        member2Name: detail.team_details.members_details[1]?.name,
        member2Email: detail.team_details.members_details[1]?.email,
        member2NIK: detail.team_details.members_details[1]?.nik ?? undefined,
        member2NIM: detail.team_details.members_details[1]?.nim ?? undefined,
        member2WhatsApp: detail.team_details.members_details[1]?.phone_number,
        member2StudentCard: getSessionStorageWithDefault(
          "member2StudentCard",
          detail.team_details.members_details[1]?.student_card,
        ),
        member2TwibbonProof: getSessionStorageWithDefault(
          "member2TwibbonProof",
          detail.team_details.members_details[1]?.twibbon,
        ),

        // Payment Information
        amount: detail.payment_details.amount,
        senderName: detail.payment_details.sender_account,
        bankId: detail.payment_details.bank_id,
        bankName: detail.payment_details.sender_bank,
        proofOfTransfer: getSessionStorageWithDefault(
          "proofOfTransfer",
          detail.payment_details.proof,
        ),
        dateOfTransfer: new Date(detail.payment_details.date_of_transfer),
      };
      setData(defaults);
      form.reset(defaults);
      setIsFormReady(true);
    }
  }, [eventData, form, isFormReady]);

  const { mutate, isPending } = useUDSRCUpdateMutation();

  const onSubmit = (finalStepData: Partial<UDSRCFormData>) => {
    const finalData = {
      ...data,
      ...finalStepData,
    } as UDSRCFormData;

    const uploads = {
      statementLetter: getSessionStorageWithDefault(
        "statementLetter",
        eventData?.[0]?.statement_letter ?? "",
      ),
      leaderStudentCard: getSessionStorageWithDefault(
        "leaderStudentCard",
        eventData?.[0]?.team_details.leader_details.student_card ?? "",
      ),
      leaderTwibbonProof: getSessionStorageWithDefault(
        "leaderTwibbonProof",
        eventData?.[0]?.team_details.leader_details.twibbon ?? "",
      ),
      member1StudentCard: getSessionStorageWithDefault(
        "member1StudentCard",
        eventData?.[0]?.team_details.members_details[0]?.student_card ?? "",
      ),
      member1TwibbonProof: getSessionStorageWithDefault(
        "member1TwibbonProof",
        eventData?.[0]?.team_details.members_details[0]?.twibbon ?? "",
      ),
      member2StudentCard: getSessionStorageWithDefault(
        "member2StudentCard",
        eventData?.[0]?.team_details.members_details[1]?.student_card ?? "",
      ),
      member2TwibbonProof: getSessionStorageWithDefault(
        "member2TwibbonProof",
        eventData?.[0]?.team_details.members_details[1]?.twibbon ?? "",
      ),
      proofOfTransfer: getSessionStorageWithDefault(
        "proofOfTransfer",
        eventData?.[0]?.payment_details.proof ?? "",
      ),
    };

    const payload = transformFormDataToPayloadUDSRC(finalData, uploads);

    mutate(payload as UDSRCRegisterRequest, {
      onSuccess: () => setActiveStep(totalSteps),
    });

    setData(finalData);
    setActiveStep((prev) => prev + 1);
  };

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    const currentData = form.getValues();
    setData((prev) => ({ ...prev, ...currentData }));
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    // Get the original fetched url safely
    const originalStatementLetter = eventData?.[0]?.statement_letter;

    const initialLeaderUrls = {
      leaderStudentCard:
        eventData?.[0]?.team_details.leader_details.student_card,
      leaderTwibbonProof: eventData?.[0]?.team_details.leader_details.twibbon,
    };
    // Initial URLs for members
    const initialMember1Urls = {
      studentCard:
        eventData?.[0]?.team_details.members_details[0]?.student_card,
      twibbonProof: eventData?.[0]?.team_details.members_details[0]?.twibbon,
    };

    const initialMember2Urls = {
      studentCard:
        eventData?.[0]?.team_details.members_details[1]?.student_card,
      twibbonProof: eventData?.[0]?.team_details.members_details[1]?.twibbon,
    };

    // Initial URLs for payment
    const intialProofOfTransferUrl = eventData?.[0]?.payment_details.proof;

    switch (activeStep) {
      case 0:
        return (
          <StepTeamInformation
            onNext={handleNext}
            initialStatementLetterUrl={originalStatementLetter}
          />
        );
      case 1:
        return (
          <StepLeader
            onNext={handleNext}
            onBack={handleBack}
            initialFileUrls={initialLeaderUrls}
          />
        );
      case 2:
        return (
          <StepMembers
            onNext={handleNext}
            onBack={handleBack}
            initialMember1Urls={initialMember1Urls}
            initialMember2Urls={initialMember2Urls}
          />
        );
      case 3:
        return (
          <StepPayment
            onSubmit={onSubmit}
            onBack={handleBack}
            isLoading={isPending}
            initialProofOfTransferUrl={intialProofOfTransferUrl}
          />
        );
      case 4:
        return <StepDone />;
    }
  };

  const isDone = activeStep === totalSteps;
  const currentStepMeta =
    UDSRCsteps[activeStep] ?? UDSRCsteps[UDSRCsteps.length - 1];
  const progress = currentStepMeta.value;
  const stepLabel = currentStepMeta.label;
  const stepCountLabel = isDone
    ? "Done"
    : `Step ${activeStep + 1} of ${totalSteps}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeStep]);

  if (isEventLoading || !isFormReady) {
    return (
      <FormLayout
        heroImage={{
          src: "/udsrc-hero.png",
          alt: "UDSRC Hero",
          width: 1280,
          height: 1096,
        }}
        title="UGM Dental Scientific Research Competition"
        subtitle="Denta Paramitha's Science Festival and Competition FKG Universitas Gadjah Mada"
      >
        <div className="flex h-60 w-full items-center justify-center">
          {/* You can replace this with a spinner component */}
          <Typography variant="h5">Loading form data...</Typography>
          {/* <LoadingSpinner /> */}
        </div>
      </FormLayout>
    );
  }

  return (
    <FormLayout
      heroImage={{
        src: "/udsrc-hero.png",
        alt: "UDSRC Hero",
        width: 1280,
        height: 1096,
      }}
      title="UGM Dental Scientific Research Competition"
      subtitle="Denta Paramitha's Science Festival and Competition FKG Universitas Gadjah Mada"
    >
      <div className="flex w-full flex-col">
        <Typography
          variant="p"
          font="Rubik"
          className="flex w-fit text-[12px] font-semibold text-neutral-500"
        >
          Step: {stepCountLabel}
        </Typography>
        <div className="flex w-full flex-row gap-2">
          <Typography
            variant="p"
            font="Rubik"
            weight="bold"
            className="flex w-full text-[12px] text-neutral-900"
          >
            {stepLabel}
          </Typography>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <Progress value={progress} className="w-full" />
            <Typography
              variant="p"
              font="Rubik"
              className="flex w-fit text-[12px] font-medium text-neutral-500"
            >
              {progress}%
            </Typography>
          </div>
        </div>
      </div>

      <Separator />

      <FormProvider key={activeStep} {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          {renderStep()}
        </form>
      </FormProvider>
    </FormLayout>
  );
}
