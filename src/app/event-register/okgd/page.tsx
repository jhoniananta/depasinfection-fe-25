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

import { OKGDsteps } from "@/contents/okgd-register-content";
import { getSessionDefault, transformFormDataToPayloadOKGD } from "@/lib/utils";
import { OKGDRegisterRequest } from "@/types/event-register";
import { ZodType } from "zod";
import StepDone from "./_components/StepDone";
import StepLeader from "./_components/StepLeader";
import StepMembers from "./_components/StepMembers";
import StepPayment from "./_components/StepPayment";
import StepTeacher from "./_components/StepTeacher";
import StepTeamInformation from "./_components/StepTeamInformation";
import { useOKGDRegisterMutation } from "./_hooks/@post/useOKGDRegister";

const stepSchemas = [
  stepTeamSchema,
  stepLeaderSchema,
  stepMembersSchema,
  stepTeacherSchema,
  stepPaymentSchema,
];

const totalSteps = stepSchemas.length;

export default function OKGDRegisterPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<Partial<OKGDFormData>>({});
  const currentSchema = stepSchemas[activeStep];

  const form = useForm<Partial<OKGDFormData>>({
    mode: "onChange",
    resolver: zodResolver(
      currentSchema as unknown as ZodType<Partial<OKGDFormData>>,
    ),
    shouldUnregister: false,
    defaultValues: {
      ...data,
      integrityPact: getSessionDefault("integrityPact"),
      leaderStudentCard: getSessionDefault("leaderStudentCard"),
      leaderTwibbonProof: getSessionDefault("leaderTwibbonProof"),
      member1StudentCard: getSessionDefault("member1StudentCard"),
      member1TwibbonProof: getSessionDefault("member1TwibbonProof"),
      member2StudentCard: getSessionDefault("member2StudentCard"),
      member2TwibbonProof: getSessionDefault("member2TwibbonProof"),
      proofOfTransfer: getSessionDefault("proofOfTransfer"),
    },
  });

  const { mutate, isPending } = useOKGDRegisterMutation();

  const onSubmit = (finalStepData: Partial<OKGDFormData>) => {
    const finalData = {
      ...data,
      ...finalStepData,
    } as OKGDFormData;

    const payload = transformFormDataToPayloadOKGD(finalData);
    mutate(payload as OKGDRegisterRequest, {
      onSuccess: () => setActiveStep(totalSteps),
    });

    setData(finalData); // final merge
    setActiveStep((prev) => prev + 1); // go to done
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
    switch (activeStep) {
      case 0:
        return <StepTeamInformation onNext={handleNext} />;
      case 1:
        return <StepLeader onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <StepMembers onNext={handleNext} onBack={handleBack} />;
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
