"use client";

import { CopyButton } from "@/components/CopyButton";
import Title from "@/components/Title";
import Typography from "@/components/Typography";
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
  FormDescription,
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
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface StepPaymentProps {
  onSubmit: () => void;
  onBack: () => void;
}

function formatSubCompetition(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function StepPayment({ onSubmit, onBack }: StepPaymentProps) {
  const { watch } = useFormContext();
  const form = useFormContext();
  const [openDialog, setOpenDialog] = useState(false);
  const rawSubCompetition = watch("subCompetition");
  const [selectedAccount, setSelectedAccount] = useState("");

  const subCompetition = rawSubCompetition
    ? formatSubCompetition(rawSubCompetition)
    : "error, please try again later/choose your competition corectly.";

  const handleOpenDialog = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
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
            {subCompetition}
          </Typography>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold">Fee</label>
          <div className="flex flex-row items-center gap-2">
            <Typography
              variant="p"
              font="Rubik"
              className="w-full rounded-md border bg-neutral-100 px-2.5 py-1 text-justify text-[16px] text-neutral-900 md:text-[16px] lg:text-[16px]"
            >
              IDR 99.000,00
            </Typography>
            <CopyButton text="99000" />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">
            Please Transfer into this Account Bank{" "}
            <span className="text-destructive">*</span>
          </label>
          <div className="flex flex-row items-center gap-2">
            <Select
              onValueChange={(val) => {
                setSelectedAccount(
                  val === "btpn-smbc"
                    ? "90380505067"
                    : val === "paypal"
                      ? "@Nasywaalifaa"
                      : "error, please try again later.",
                );
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="btpn-smbc">
                  90380505067 - BTPN / SMBC (Jenius) (Nasywa Alifa Jasmine)
                </SelectItem>
                <SelectItem value="paypal">PayPal - @Nasywaalifaa</SelectItem>
              </SelectContent>
            </Select>
            <CopyButton text={selectedAccount || ""} />
          </div>
        </div>

        <FormField
          name="proofOfTransfer"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel isRequired>Proof of Transfer</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  placeholder="Upload your proof of transfer"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.PNG,.JPG,.JPEG"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormDescription>
                Upload on format .pdf, .png, jpg, or .jpeg
              </FormDescription>
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
          name="senderEmail"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel isRequired>Sender Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter sender email"
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
          className="w-full bg-gradient-to-r from-amber-300 to-yellow-400 px-8 py-6 text-2xl font-bold"
        >
          Submit
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
                onSubmit(); // trigger actual parent submit
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
