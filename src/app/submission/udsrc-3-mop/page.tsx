"use client";

import Title from "@/components/Title";
import { Button } from "@/components/ui/button";

import withAuth from "@/components/WithAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import UploadFile from "@/components/UploadFile";
import FormLayout from "@/layouts/FormLayout";
import { getSessionDefault } from "@/lib/utils";
import {
  UDSRC3MOPSubmissionData,
  UDSRC3MOPSubmissionSchema,
} from "@/schemas/udsrc-submission-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUDSRCSubmissionMutation } from "../_hooks/@post/useSubmissionEvent";

export default withAuth(UDSRC3MOPSubmissionPage, "USER");
function UDSRC3MOPSubmissionPage() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    setOpenDialog(true);
  };

  const form = useForm<UDSRC3MOPSubmissionData>({
    mode: "onChange",
    resolver: zodResolver(UDSRC3MOPSubmissionSchema),
  });

  const { mutate: submit3Mop, isPending } = useUDSRCSubmissionMutation();

  function onSubmit() {
    submit3Mop({
      abstract: getSessionDefault("abstractFile"),
      validation_sheet: getSessionDefault("validationSheet"),
      poster: null,
      description: null,
    });
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
      <Title
        title="UDSRC 3 MOP Submission"
        desc="Please upload your result on form below !"
      />

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="space-y-4">
            <FormField
              name="abstractFile"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel isRequired>Abstract File</FormLabel>
                  <FormControl>
                    <UploadFile
                      sessionIdName="abstractFile"
                      {...field}
                      uploadType="/upload-file/"
                      accept={{ "application/pdf": [] }} //! there is 2 validation for this parameter, at component and zod
                      maxSizeInBytes={25000000} //! there is 2 validation for this parameter, at component and zod
                      onChange={(file) => onChange(file)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="validationSheet"
              render={({ field: { onChange, ...field } }) => (
                <FormItem>
                  <FormLabel isRequired>Validation Sheet</FormLabel>
                  <FormControl>
                    <UploadFile
                      sessionIdName="validationSheet"
                      {...field}
                      uploadType="/upload-file/"
                      accept={{ "application/pdf": [] }} //! there is 2 validation for this parameter, at component and zod
                      maxSizeInBytes={5000000} //! there is 2 validation for this parameter, at component and zod
                      onChange={(file) => onChange(file)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            onClick={handleOpenDialog}
            type="button"
            disabled={isPending}
            className="text-olive-900 w-full bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-6 text-2xl font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500 md:px-12 lg:px-14"
          >
            Submit
          </Button>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Make sure all your data is filled in correctly before
                  submitting.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button
                  disabled={isPending}
                  onClick={() => {
                    setOpenDialog(false);
                    onSubmit();
                  }}
                >
                  Yes, submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </FormProvider>
    </FormLayout>
  );
}
