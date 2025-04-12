"use client";

import FilePreview from "@/components/FilePreview";
import Typography from "@/components/Typography";
import { EventDetails } from "@/types/dashboard-user";
import { Paperclip } from "lucide-react"; // for attachment icon

interface PaymentInformationSectionProps {
  eventDetails?: EventDetails;
}

export default function PaymentInformationSection({
  eventDetails,
}: PaymentInformationSectionProps) {
  if (!eventDetails?.[0]?.payment_details) return null;

  const payment = eventDetails[0].payment_details;

  // Format date
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="mx-auto mb-8 mt-4 w-full max-w-5xl p-6 sm:px-16 xl:p-0">
      <div className="w-full rounded-2xl bg-purple-50 p-6 px-4 shadow-md sm:px-6">
        {/* Title */}
        <div className="mb-6">
          <Typography variant="p" weight="bold" className="text-lg">
            Payment <span className="text-purple-600">Information</span>
          </Typography>
        </div>

        {/* Payment Details */}
        <div className="flex flex-col gap-3 text-sm sm:text-base">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <Typography className="text-gray-600" weight="medium">
              Date of Transfer
            </Typography>
            <Typography className="font-bold text-black" weight="bold">
              {formatDate(payment.date_of_transfer)}
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <Typography className="text-gray-600" weight="medium">
              Sender Bank
            </Typography>
            <Typography className="font-bold text-black" weight="bold">
              {payment.sender_bank}
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <Typography className="text-gray-600" weight="medium">
              Sender Name
            </Typography>
            <Typography className="font-bold text-black" weight="bold">
              {payment.sender_account}
            </Typography>
          </div>
        </div>

        {/* Proof of Payment */}
        <div className="mt-6 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Typography className="text-sm font-medium text-gray-600">
              Proof of Payment (click for detail)
            </Typography>
            <Paperclip size={16} className="text-gray-600" />
          </div>
          <FilePreview src={payment.proof || ""} className="min-h-[150px]" />
        </div>
      </div>
    </section>
  );
}
