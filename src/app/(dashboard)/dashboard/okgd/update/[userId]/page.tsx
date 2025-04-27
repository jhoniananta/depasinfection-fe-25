"use client";

import {
  stepLeaderSchema,
  stepMembersSchema,
  stepPaymentSchema,
  stepTeacherSchema,
  stepTeamSchema,
} from "@/schemas/okgd-register-schema";
import { OKGDFormData } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Typography from "@/components/Typography";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import FormLayout from "@/layouts/FormLayout";

import withAuth from "@/components/WithAuth";
import { OKGDsteps } from "@/contents/okgd-register-content";
import {
  getSessionStorageWithDefault,
  transformFormDataToPayloadOKGD,
} from "@/lib/utils";
import { OKGDRegisterRequest } from "@/types/event-register";
import { ZodType } from "zod";
import { useGetDetailsEventQuery } from "../../../_hooks/@get/useGetDetailsEvent";
import StepDone from "./_components/StepDone";
import StepLeader from "./_components/StepLeader";
import StepMembers from "./_components/StepMembers";
import StepPayment from "./_components/StepPayment";
import StepTeacher from "./_components/StepTeacher";
import StepTeamInformation from "./_components/StepTeamInformation";
import { useOKGDUpdateMutation } from "./_hooks/@put/useOKGDUpdate";

const stepSchemas = [
  stepTeamSchema,
  stepLeaderSchema,
  stepMembersSchema,
  stepTeacherSchema,
  stepPaymentSchema,
];

const totalSteps = stepSchemas.length;

export default withAuth(RevisiOKGD, "USER");
function RevisiOKGD() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<Partial<OKGDFormData>>({});

  const currentSchema = stepSchemas[activeStep];

  // Fetch data untuk update
  const { data: eventData } = useGetDetailsEventQuery();

  const form = useForm<Partial<OKGDFormData>>({
    mode: "onChange",
    resolver: zodResolver(
      currentSchema as unknown as ZodType<Partial<OKGDFormData>>,
    ),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!eventData) return;

    // Ambil object dari array
    const detail = Array.isArray(eventData) ? eventData[0] : eventData;

    // Map field API -> formData
    const defaults: Partial<OKGDFormData> = {
      // Team Information
      teamName: detail.team_name,
      schoolName: detail.university,
      schoolAddress: detail.school_address,
      integrityPact: getSessionStorageWithDefault(
        "integrityPact",
        detail.integrity_pact,
      ),

      // Leader Information
      leaderName: detail.team_details.leader_details.name,
      leaderEmail: detail.team_details.leader_details.email,
      leaderNIK: detail.team_details.leader_details.nik ?? undefined,
      leaderNISN: detail.team_details.leader_details.nisn ?? undefined,
      leaderWhatsApp: detail.team_details.leader_details.phone_number,
      leaderStudentCard: getSessionStorageWithDefault(
        "leaderStudentCard",
        detail.team_details.leader_details.student_card,
      ),
      leaderTwibbonProof: getSessionStorageWithDefault(
        "leaderTwibbonProof",
        detail.team_details.leader_details.twibbon,
      ),

      // Members information
      member1Name: detail.team_details.members_details[0]?.name,
      member1Email: detail.team_details.members_details[0]?.email,
      member1NIK: detail.team_details.members_details[0]?.nik ?? undefined,
      member1NISN: detail.team_details.members_details[0]?.nisn ?? undefined,
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
      member2NISN: detail.team_details.members_details[1]?.nisn ?? undefined,
      member2WhatsApp: detail.team_details.members_details[1]?.phone_number,
      member2StudentCard: getSessionStorageWithDefault(
        "member2StudentCard",
        detail.team_details.members_details[1]?.student_card,
      ),
      member2TwibbonProof: getSessionStorageWithDefault(
        "member2TwibbonProof",
        detail.team_details.members_details[1]?.twibbon,
      ),

      // Teacher Information
      teacherName: detail.teacher_details?.teacher_name,
      teacherEmail: detail.teacher_details?.teacher_email,
      teacherWhatsApp: detail.teacher_details?.teacher_phone,

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
  }, [eventData]);

  const { mutate, isPending } = useOKGDUpdateMutation();

  const onSubmit = (finalStepData: Partial<OKGDFormData>) => {
    const finalData = {
      ...data,
      ...finalStepData,
    } as OKGDFormData;

    const uploads = {
      integrityPact: getSessionStorageWithDefault(
        "integrityPact",
        eventData?.[0]?.integrity_pact ?? "",
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

    const payload = transformFormDataToPayloadOKGD(finalData, uploads);

    mutate(payload as OKGDRegisterRequest, {
      onSuccess: () => setActiveStep(totalSteps),
    });

    setData(finalData);
    setActiveStep((prev) => prev + 1);
  };

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const currentData = form.getValues();
    setData((prev) => ({ ...prev, ...currentData }));
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    // Get the original fetched url safely
    const originalIntegrityPact = eventData?.[0]?.integrity_pact;

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
            initialIntegrityPactUrl={originalIntegrityPact}
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
        return <StepTeacher onNext={handleNext} onBack={handleBack} />;
      case 4:
        return (
          <StepPayment
            onSubmit={() => {
              const { teacherAgreement, ...filteredValues } = form.getValues();
              onSubmit(filteredValues);
            }}
            onBack={handleBack}
            isLoading={isPending}
            initialProofOfTransferUrl={intialProofOfTransferUrl}
          />
        );

      case 5:
        return <StepDone />;
    }
  };

  const isDone = activeStep === totalSteps;
  const currentStepMeta =
    OKGDsteps[activeStep] ?? OKGDsteps[OKGDsteps.length - 1];
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

  return (
    <FormLayout
      heroImage={{
        src: "/okgd-hero.png",
        alt: "OKGD Hero",
        width: 1280,
        height: 1096,
      }}
      title="National Olympiad Competition (OKGD)"
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
