"use client";

import { FormProvider, useForm } from "react-hook-form";

import Typography from "@/components/Typography";
import ImageUpload from "@/components/UploadFile";
import Input from "@/components/form/Input";

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
              <ImageUpload
                id="image-upload"
                title="Upload Image"
                variant="md"
                accept={{
                  "image/jpeg": [],
                  "image/png": [],
                }}
                description="Upload your image file here"
                maxSizeInBytes={1000000}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
