"use client";

import { Metadata } from "next";

import LoadingComponent from "@/components/Loading";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Loading...",
};

export default function LoadingGlobalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent early render

  return <LoadingComponent />;
}
