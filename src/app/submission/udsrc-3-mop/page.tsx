"use client";

import Title from "@/components/Title";
import { Button } from "@/components/ui/button";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { toast } from "@/hooks/use-toast";
import FormLayout from "@/layouts/FormLayout";
import {
  UDSRC3MOPSubmissionData,
  UDSRC3MOPSubmissionSchema,
} from "@/schemas/udsrc-submission-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function OKGD3MopSubmissionPage() {
  const [openDialog, setOpenDialog] = useState(false);
  // const [data, setData] = useState<UDSRC3MOPSubmissionData>();

  const handleOpenDialog = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    setOpenDialog(true);
  };

  const form = useForm<UDSRC3MOPSubmissionData>({
    mode: "onChange",
    resolver: zodResolver(UDSRC3MOPSubmissionSchema),
  });

  const onSubmit = (data: UDSRC3MOPSubmissionData) => {
    toast({
      title: "Submitted!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

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
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel isRequired>Abstract File</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="application/pdf"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormDescription>Upload on format .pdf</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="validationSheet"
              render={({ field: { onChange, value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel isRequired>Validation Sheet</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept="application/pdf"
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormDescription>Upload on format .pdf</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            onClick={handleOpenDialog}
            type="button"
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
                  onClick={() => {
                    setOpenDialog(false);
                    onSubmit(form.getValues());
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
