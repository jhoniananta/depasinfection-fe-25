"use client";

import PdfPreview from "@/components/PdfPreview";
import Title from "@/components/Title";
import UploadFile from "@/components/UploadFile";
import { Button } from "@/components/ui/button";
import { CountryDropdown } from "@/components/ui/country-dropdown";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StepTeamInformationProps {
  onNext: () => void;
  initialStatementLetterUrl?: string;
}

export default function StepTeamInformation({
  onNext,
  initialStatementLetterUrl,
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
          name="university"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>University</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your university name"
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
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Nationality</FormLabel>
              <FormControl>
                <CountryDropdown
                  placeholder="Select your nationality"
                  defaultValue={field.value}
                  onChange={(country) => field.onChange(country.alpha3)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="subCompetition"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>Sub Competition</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your sub competition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="poster-competition">
                    Poster Competition
                  </SelectItem>
                  <SelectItem value="3-minutes-oral-competition">
                    3 Minutes Oral Competition
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="statementLetter"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel isRequired>
                Statement Letter (click preview for your previous File)
              </FormLabel>
              <FormControl>
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <PdfPreview title="" src={initialStatementLetterUrl || ""} />
                  <UploadFile
                    sessionIdName="statementLetter"
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
