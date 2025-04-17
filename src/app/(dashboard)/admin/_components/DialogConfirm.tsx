"use client";
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { UseFormRegisterReturn } from "react-hook-form";

type DialogConfirmProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  withInput?: boolean;
  inputLabel?: string;
  register?: UseFormRegisterReturn;
};

export default function DialogConfirm({
  open,
  setOpen,
  title,
  description,
  onConfirm,
  withInput = false,
  inputLabel,
  register,
}: DialogConfirmProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <Typography variant="h6" weight="bold">
              {title}
            </Typography>
          </DialogTitle>
          <DialogDescription>
            <Typography variant="p" className="text-sm text-gray-600">
              {description}
            </Typography>
          </DialogDescription>
        </DialogHeader>

        {withInput && (
          <div className="mt-4 flex flex-col gap-2">
            <Typography variant="p" weight="medium">
              {inputLabel}
            </Typography>
            <Textarea
              placeholder="Enter your reason here..."
              {...register}
              className="min-h-[120px]"
            />
          </div>
        )}

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            type="button"
            className="text-olive-900 bg-gradient-to-r from-amber-300 to-yellow-400 font-bold text-[#a88a44] shadow-md hover:from-amber-400 hover:to-yellow-500"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
