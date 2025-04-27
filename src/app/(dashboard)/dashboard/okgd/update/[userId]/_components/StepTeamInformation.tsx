"use client";

import Title from "@/components/Title";
import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import PdfPreview from "@/components/PdfPreview";
import UploadFile from "@/components/UploadFile";
import { Textarea } from "@/components/ui/textarea";

interface StepTeamInformationProps {
  onNext: () => void;
  initialIntegrityPactUrl?: string;
}

export default function StepTeamInformation({
  onNext,
  initialIntegrityPactUrl,
}: StepTeamInformationProps) {
  return (
    <>
      <Title
        title="Team Information"
        desc="Please fill this form to register the competition"
      />

      <div className="w-full space-y-4">
        <FormField
          name="teamName"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>Team&apos;s Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your team's name"
                  value={value || ""}
                  onChange={onChange}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="schoolName"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>School Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your school name"
                  value={value || ""}
                  onChange={onChange}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="schoolAddress"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>School Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your school address"
                  // className="resize-none"
                  value={value || ""}
                  onChange={onChange}
                  {...rest}
                />
              </FormControl>
              <FormDescription>
                Ex : Jln. Mawar, Gg X, No.4, Sukolilo, Surabaya, Jawa Timur
                60119
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="integrityPact"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel isRequired>
                Integrity Pact (click preview for your previous File)
              </FormLabel>
              <FormControl>
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <PdfPreview title="" src={initialIntegrityPactUrl || ""} />
                  <UploadFile
                    sessionIdName="integrityPact"
                    {...field}
                    uploadType="/upload-file/"
                    accept={{ "application/pdf": [] }} //! there is 2 validation for this parameter, at component and zod
                    maxSizeInBytes={5000000} //! there is 2 validation for this parameter, at component and zod
                    onChange={(file) => onChange(file)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Button
        onClick={onNext}
        className="text-olive-900 w-full bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-6 text-2xl font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500 md:px-12 lg:px-14"
      >
        Next
      </Button>
    </>
  );
}
