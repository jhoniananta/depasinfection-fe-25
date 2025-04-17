import { Metadata } from "next";
import { ReactNode } from "react";

interface EventRegisterLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Event Registration",
};

export default function EventRegisterLayout({
  children,
}: EventRegisterLayoutProps) {
  return <>{children}</>;
}
