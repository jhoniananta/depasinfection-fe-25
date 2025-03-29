"use client";

import Typography from "@/components/Typography";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { UDSRCsteps } from "@/contents/udsrc-register-content";
import { toast } from "@/hooks/use-toast";
import FormLayout from "@/layouts/FormLayout";
import { fullUDSRCSchema } from "@/schemas/udsrc-register-schema";
import { UDSRCFormData } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import StepDone from "./_components/StepDone";
import StepLeader from "./_components/StepLeader";
import StepMembers from "./_components/StepMembers";
import StepPayment from "./_components/StepPayment";
import StepTeamInformation from "./_components/StepTeamInformation";

export default function UDSRCRegisterPage() {
  const [step, setStep] = useState(1);
  const formMethods = useForm({
    resolver: zodResolver(fullUDSRCSchema),
  });

  const onSubmit = (data: UDSRCFormData) => {
    toast({
      title: "Submitted!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof UDSRCFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "teamName",
        "university",
        "nationality",
        "subCompetition",
        "statementLetter",
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "leaderName",
        "leaderEmail",
        "leaderNIK",
        "leaderNIM",
        "leaderWhatsApp",
        "leaderStudentCard",
        "leaderTwibbonProof",
      ];
    } else if (step === 3) {
      fieldsToValidate = [
        "member1Name",
        "member1Email",
        "member1NIK",
        "member1NIM",
        "member1WhatsApp",
        "member1StudentCard",
        "member1TwibbonProof",
        "member2Name",
        "member2Email",
        "member2NIK",
        "member2NIM",
        "member2WhatsApp",
        "member2StudentCard",
        "member2TwibbonProof",
        "member3Name",
        "member3Email",
        "member3NIK",
        "member3NIM",
        "member3WhatsApp",
        "member3StudentCard",
        "member3TwibbonProof",
      ];
    } else if (step === 4) {
      fieldsToValidate = [
        "proofOfTransfer",
        "senderName",
        "senderEmail",
        "dateOfTransfer",
      ];
    }

    const valid = await formMethods.trigger(fieldsToValidate);
    if (valid) setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const isDone = step === 5;
  const progress = UDSRCsteps[step - 1].value;
  const stepLabel = UDSRCsteps[step - 1].label;
  const stepCountLabel = isDone ? "Done" : `${step} of 4`;

  // console.log(formMethods.formState.errors);

  return (
    <FormLayout
      heroImage={{
        src: "/udsrc-hero.png",
        alt: "UDSRC Hero",
        width: 1280,
        height: 1096,
      }}
      title="UGM Dental Student Research Competition"
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

      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          {step === 1 && <StepTeamInformation onNext={nextStep} />}
          {step === 2 && <StepLeader onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <StepMembers onNext={nextStep} onBack={prevStep} />}
          {step === 4 && <StepPayment onNext={nextStep} onBack={prevStep} />}
          {step === 5 && <StepDone />}
        </form>
      </FormProvider>
    </FormLayout>
  );
}
