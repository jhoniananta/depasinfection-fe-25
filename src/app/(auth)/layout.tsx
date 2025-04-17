import FormLayout from "@/layouts/FormLayout";
import { Metadata } from "next";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <FormLayout
      heroImage={{
        src: "/auth-hero.png",
        alt: "Auth Hero",
        width: 1280,
        height: 1096,
      }}
      title="Depa's Infection"
      subtitle="Denta Paramitha's Science Festival and Competition FKG Universitas Gadjah Mada"
    >
      {children}
    </FormLayout>
  );
}
