"use client";

import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "../../../components/Title";

type Props = {
  token?: string;
};

function VerifyEmailPage({ token }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    // Simulasi verifikasi pakai token
    const timer = setTimeout(() => {
      setLoading(false);
      // TODO: panggil API untuk verifikasi pakai token
    }, 2000);

    return () => clearTimeout(timer);
  }, [token]);

  if (loading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-8">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <Typography
          variant="p"
          font="Rubik"
          className="text-sm text-muted-foreground"
        >
          Verifying your email...
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Title
        title="Success!"
        desc="Your account has been successfully verified!"
      />
      <Typography
        variant="p"
        font="Rubik"
        className="text-justify text-[12px] text-neutral-900"
      >
        You now have full access to the competition platform, where you can
        register for challenges, track your progress, and stay updated with the
        latest announcements.
      </Typography>
      <Button onClick={() => router.push("/dashboard")} className="w-full">
        Go to dashboard
      </Button>
    </>
  );
}

export default VerifyEmailPage;
