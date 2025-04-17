import { Metadata } from "next";
import { ReactNode } from "react";

interface MerchandiseLayoutPageProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Merchandise",
};

export default function MerchandiseLayoutPage({
  children,
}: MerchandiseLayoutPageProps) {
  return <>{children}</>;
}
