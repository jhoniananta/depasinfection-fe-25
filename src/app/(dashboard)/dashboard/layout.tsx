import { Metadata } from "next";
import { ReactNode } from "react";

interface DashboardLayoutUserProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayoutUser({
  children,
}: DashboardLayoutUserProps) {
  return <>{children}</>;
}
