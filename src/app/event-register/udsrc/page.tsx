"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  stepLeaderSchema,
  stepMembersSchema,
  stepPaymentSchema,
  stepTeamSchema,
} from "@/schemas/udsrc-register-schema";
import { UDSRCFormData } from "@/types/form";

import Typography from "@/components/Typography";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { UDSRCsteps } from "@/contents/udsrc-register-content";
import { toast } from "@/hooks/use-toast";
import FormLayout from "@/layouts/FormLayout";
import { ZodType } from "zod";

import StepDone from "./_components/StepDone";
import StepLeader from "./_components/StepLeader";
import StepMembers from "./_components/StepMembers";
import StepPayment from "./_components/StepPayment";
import StepTeamInformation from "./_components/StepTeamInformation";

const stepSchemas = [
  stepTeamSchema,
  stepLeaderSchema,
  stepMembersSchema,
  stepPaymentSchema,
];

const totalSteps = stepSchemas.length;

export default function UDSRCRegisterPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<Partial<UDSRCFormData>>({});
  const currentSchema = stepSchemas[activeStep];

  const form = useForm<Partial<UDSRCFormData>>({
    mode: "onChange",
    resolver: zodResolver(
      currentSchema as unknown as ZodType<Partial<UDSRCFormData>>,
    ),
    shouldUnregister: false,
    defaultValues: data,
  });

  const onSubmit = (finalStepData: Partial<UDSRCFormData>) => {
    const finalData = {
      ...data,
      ...finalStepData,
    } as UDSRCFormData;

    toast({
      title: "Submitted!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(finalData, null, 2)}
          </code>
        </pre>
      ),
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
        return (
          <StepPayment
            onSubmit={() => onSubmit(form.getValues())}
            onBack={handleBack}
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
