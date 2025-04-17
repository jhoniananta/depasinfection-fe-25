import { Metadata } from "next";
import { ReactNode } from "react";

interface EventSubmissionLayoutPageProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Event Submission",
};

export default function EventSubmissionLayoutPage({
  children,
}: EventSubmissionLayoutPageProps) {
  return <>{children}</>;
}
