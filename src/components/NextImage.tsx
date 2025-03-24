"use client";

import Image, { ImageProps } from "next/image";
import * as React from "react";

import clsxm from "@/lib/clsxm";

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  serverStaticImg?: boolean;
  blurClassName?: string;
  alt: string;
} & ImageProps;

export default function NextImage({
  useSkeleton = false,
  serverStaticImg = false,
  src,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  fill,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState(
    useSkeleton ? "loading" : "complete",
  );
  const widthIsSet = className?.includes("w-") ?? false;

  return (
    <figure
      style={!widthIsSet && !fill ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={clsxm(
          imgClassName,
          status === "loading" &&
            clsxm("animate-pulse bg-red-50", blurClassName),
        )}
        src={serverStaticImg ? src : "/images" + src}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        alt={alt}
        onLoad={() => setStatus("complete")}
        {...rest}
      />
    </figure>
  );
}
