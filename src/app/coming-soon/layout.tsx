import { Metadata } from "next";
import { ReactNode } from "react";

interface DepasEventLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Coming Soon",
};

export default function DepasEventLayout({ children }: DepasEventLayoutProps) {
  return <>{children}</>;
}
