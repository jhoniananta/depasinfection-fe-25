"use client";

import { CopyButton } from "@/components/CopyButton";
import Title from "@/components/Title";
import Typography from "@/components/Typography";
import UploadFile from "@/components/UploadFile";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn, getFeeInfoOKGD } from "@/lib/utils";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FilePreview from "../../../../../../../components/FilePreview";

interface StepPaymentProps {
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
  initialProofOfTransferUrl?: string;
}

export default function StepPayment({
  onBack,
  onSubmit,
  isLoading,
  initialProofOfTransferUrl,
}: StepPaymentProps) {
  const form = useFormContext();
  const { setValue, watch } = form;

  const feeInfo = getFeeInfoOKGD();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");

  const bankIdValue = watch("bankId");

  useEffect(() => {
    if (typeof feeInfo?.value === "number") {
      setValue("amount", feeInfo.value);
    }
  }, [feeInfo, setValue]);

  // Effect to update the selectedAccount state based on the form's bankId value
  useEffect(() => {
    // bankIdValue comes from the form state (which is initialized in page.tsx)
    if (bankIdValue === 1) {
      setSelectedAccount("90380505067");
    } else {
      // Handle other bank IDs or undefined/null case
      setSelectedAccount("");
    }
  }, [bankIdValue]);

  const handleOpenDialog = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      const errorMessages = Object.entries(form.formState.errors)
        .map(([field, error]) => `${field}: ${error?.message}`)
        .join(", ");

      toast({
        title: "Missing or invalid fields",
        description: errorMessages || "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    setOpenDialog(true);
  };

  return (
    <>
      <Title
        title="Payment"
        desc="Please check this information to regist the competition"
      />

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold">
            Competition
          </label>
          <Typography
            variant="p"
            font="Rubik"
            className="rounded-md border bg-neutral-100 px-2.5 py-1 text-justify text-[16px] text-neutral-900 md:text-[16px] lg:text-[16px]"
          >
            National Olympiad Competition (OKGD)
          </Typography>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Fee</label>
          <div className="flex flex-row items-center gap-2">
            <Typography
              variant="p"
              font="Rubik"
              className="w-full rounded-md border bg-neutral-100 px-2.5 py-1 text-justify text-[16px] text-neutral-900"
            >
              {feeInfo.label}
            </Typography>
            <CopyButton text={feeInfo.value?.toString() || ""} />
          </div>
        </div>

        <FormField
          name="bankId"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired>
                Please Transfer into this Account Bank
              </FormLabel>
              <div className="flex flex-row items-center gap-2">
                <Select
                  value={
                    field.value !== undefined && field.value !== null
                      ? String(field.value)
                      : ""
                  }
                  onValueChange={(val: string) => {
                    const numericValue = parseInt(val, 10);
                    if (!isNaN(numericValue)) {
                      field.onChange(numericValue);
                    } else {
                      field.onChange(undefined);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">
                      90380505067 - BTPN / SMBC (Jenius) (Nasywa Alifa Jasmine)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <CopyButton text={selectedAccount || ""} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="proofOfTransfer"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel isRequired>
                Proof of Transfer (preview of your previous image)
              </FormLabel>
              <FormControl>
                <div className="flex w-full flex-col gap-4">
                  <FilePreview
                    title=""
                    src={initialProofOfTransferUrl || " "}
                  />
                  <UploadFile
                    sessionIdName="proofOfTransfer"
                    {...field}
                    uploadType="/upload-image/"
                    accept={{
                      "image/jpeg": [],
                      "image/png": [],
                      "image/jpg": [],
                    }}
                    maxSizeInBytes={5_000_000}
                    onChange={(file) => onChange(file)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="bankName"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>Bank Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter bank name"
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
          name="senderName"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>Sender Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter sender name"
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
          name="dateOfTransfer"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel isRequired>Date of Transfer</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="text-olive-900 w-full px-8 py-6 text-2xl font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500 md:px-12 lg:px-14"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleOpenDialog}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-6 text-2xl font-bold"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Make sure all your data is filled in correctly before submitting.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
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
    </>
  );
}
