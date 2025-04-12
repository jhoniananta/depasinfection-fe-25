"use client";

import "yet-another-react-lightbox/styles.css";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Typography from "@/components/Typography";
import api from "@/lib/api";
import { getToken } from "@/lib/cookies";

type FilePreviewProps = {
  title?: string;
  src: string;
  className?: string;
};

export default function FilePreview({
  title,
  src,
  className,
}: FilePreviewProps) {
  const [open, setOpen] = useState(false);

  const zoomRef = useRef(null);

  const token = getToken();

  const { data: imageData } = useQuery({
    queryKey: [src],
    queryFn: async () => {
      const response = await api.get(`/image/${src}?token=${token}`, {
        responseType: "blob",
      });
      return { data: URL.createObjectURL(response.data) };
    },
  });

  return (
    <>
      <section
        className={twMerge(
          `${className}`,
          "flex w-full flex-col gap-3 text-left",
          title ? "gap-3" : "gap-0",
        )}
      >
        {title && (
          <Typography className="text-default-700 w-fit text-sm font-bold">
            {title}
          </Typography>
        )}

        <div
          className="border-default-400 relative flex min-h-[120px] h-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-white"
          onClick={() => imageData && setOpen(true)}
        >
          {!imageData && (
            <span className="text-xs text-gray-400">Loading preview...</span>
          )}

          {imageData && (
            <img
              src={imageData.data}
              alt="preview"
              className="h-full w-full rounded-2xl object-cover"
            />
          )}
        </div>
      </section>

      {imageData && (
        <Lightbox
          open={open}
          plugins={[Zoom]}
          zoom={{ ref: zoomRef }}
          slides={[{ src: imageData.data }]}
          close={() => setOpen(false)}
          render={{ buttonNext: () => null, buttonPrev: () => null }}
        />
      )}
    </>
  );
}
