"use client";

import Typography from "@/components/Typography";

import Button from "@/components/buttons/Button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Title from "../../../components/Title";
import { useVerifyEmailQuery } from "../_hooks/@get/useVerify";

type Props = {
  token?: string;
};

function VerifyEmailPage({ token }: Props) {
  const router = useRouter();

  // useVerifyEmailQuery automatically fires if token is provided.
  const { isSuccess, isLoading } = useVerifyEmailQuery(token || "");

  if (isLoading) {
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

  if (!token) {
    router.push("/register");
    toast({
      title: "Token not found",
      description: "Please register to get a verification email.",
      variant: "destructive",
    });
  }

  if (isSuccess) {
    return (
      <>
        <div className="flex w-full flex-col">
          <Typography
            variant="p"
            font="Rubik"
            className="flex w-fit text-[12px] font-semibold text-neutral-500"
          >
            Step: Done
          </Typography>

          <div className="flex w-full flex-row gap-2">
            <Typography
              variant="p"
              font="Rubik"
              weight="bold"
              className="flex w-full text-[12px] text-neutral-900"
            >
              Completed
            </Typography>
            <div className="flex w-full flex-row items-center justify-center gap-2">
              <Progress value={100} className="w-full" />
              <Typography
                variant="p"
                font="Rubik"
                className="flex w-fit text-[12px] font-medium text-neutral-500"
              >
                100%
              </Typography>
            </div>
          </div>
        </div>

        <Separator />

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
          register for challenges, track your progress, and stay updated with
          the latest announcements.
        </Typography>
        <Button
          variant="gradient-yellow"
          onClick={() => router.push("/login")}
          className="w-full"
        >
          Go to login
        </Button>
      </>
    );
  }

  return null;
}

export default VerifyEmailPage;
