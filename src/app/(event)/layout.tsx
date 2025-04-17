import { Metadata } from "next";
import { ReactNode } from "react";

interface DepasEventLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Depa's Infection Event",
};

export default function DepasEventLayout({ children }: DepasEventLayoutProps) {
  return <>{children}</>;
}
