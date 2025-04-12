"use client";

import { useSearchParams } from "next/navigation";

export const useLoginCallback = (fallback: string) => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  return callback || fallback;
};
