"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

import Typography from "@/components/Typography";
import api from "@/lib/api";
import { getToken } from "@/lib/cookies";
import { FileText } from "lucide-react"; // icon for pdf file

type PdfPreviewProps = {
  title?: string;
  src: string; // file_name
  className?: string;
};

export default function PdfPreview({ title, src, className }: PdfPreviewProps) {
  const token = getToken();

  const { data: pdfUrl } = useQuery({
    queryKey: ["pdf", src],
    queryFn: async () => {
      const response = await api.get(`/file/${src}?token=${token}`, {
        responseType: "blob",
      });
      return URL.createObjectURL(response.data);
    },
    enabled: !!src,
  });

  const handleClick = useCallback(() => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  }, [pdfUrl]);

  return (
    <section
      className={twMerge(
        className,
        "flex w-full flex-col gap-3 text-left",
        title ? "gap-3" : "gap-0",
      )}
    >
      {title && (
        <Typography className="w-fit text-sm font-bold text-default-700">
          {title}
        </Typography>
      )}
      <div
        onClick={handleClick}
        className="flex min-h-[110px] h-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-default-400 hover:bg-purple-100 transition"
      >
        {pdfUrl ? (
          <div className="flex items-center gap-2 text-sm text-purple-700 font-semibold">
            <FileText className="h-5 w-5" />
            <span>Open PDF</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400">Loading preview...</span>
        )}
      </div>
    </section>
  );
}
