"use client";

import { FormProvider, useForm } from "react-hook-form";

import Typography from "@/components/Typography";
import UploadFile from "@/components/UploadFile";
import Input from "@/components/form/Input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function FormSandbox() {
  const methods = useForm();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200">
      <div className="flex flex-col">
        <Typography
          as="h1"
          variant="h3"
          font="Bagnard"
          weight="bold"
          className="text-bagnard text-gray-900"
        >
          Form Sandbox
        </Typography>

        <FormProvider {...methods}>
          <form className="w-[600px] space-y-4">
            <Typography variant="h2" font="Rubik">
              Test
            </Typography>

            <Input id="Test" label="Haloo" placeholder="Ini placeholder" />

            <div>
              <h1 className="text-lg font-medium">Upload your image (file)</h1>
              <FormField
                name="statementLetter"
                render={({ field: { onChange, ...field } }) => (
                  <FormItem>
                    <FormLabel isRequired>Statement Letter</FormLabel>
                    <FormControl>
                      <UploadFile
                        sessionIdName="statementLetter"
                        {...field}
                        uploadType="/upload-file/"
                        accept={{ "application/pdf": [] }} //! there is 2 validation for this parameter, at component and zod
                        maxSizeInBytes={10000000} //! there is 2 validation for this parameter, at component and zod
                        onChange={(file) => onChange(file)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
