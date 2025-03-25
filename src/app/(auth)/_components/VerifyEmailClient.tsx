"use client";

import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Title from "../_components/Title";

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
      <div className="flex py-8 flex-col justify-center items-center w-full h-full gap-4">
        <Loader2 className="animate-spin size-6 text-muted-foreground" />
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
    <div className="flex py-8 flex-col justify-center items-center w-full h-full gap-6">
      <Title
        title="Success!"
        desc="Your account has been successfully verified!"
      />
      <Typography
        variant="p"
        font="Rubik"
        className="text-neutral-900 text-justify text-[12px]"
      >
        You now have full access to the competition platform, where you can
        register for challenges, track your progress, and stay updated with the
        latest announcements.
      </Typography>
      <Button onClick={() => router.push("/dashboard")} className="w-full">
        Go to dashboard
      </Button>
    </div>
  );
}

export default VerifyEmailPage;
