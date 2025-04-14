"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Typography from "@/components/Typography";
import withAuth from "@/components/WithAuth";

import Button from "@/components/buttons/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordFormSchema } from "@/schemas/auth-schema";
import Title from "../../../components/Title";
import { useForgotPasswordMutation } from "../_hooks/@post/useForgotPassword";

export default withAuth(ForgotPasswordPage, "GUEST");
function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const { handleForgotPassword, isSuccess, isPending } =
    useForgotPasswordMutation();

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof ForgotPasswordFormSchema>) {
    handleForgotPassword({ email: data.email });
  }

  useEffect(() => {
    if (isSuccess) {
      setSent(true);
    }
  }, [isSuccess]);

  // Efek untuk countdown tombol resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendTimer]);

  const email = form.watch("email");

  return (
    <>
      {!sent ? (
        <>
          <Title
            title="Forgot Password"
            desc="Enter the email used to create your account. We'll send you a link to reset your password."
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="w-full space-y-4">
          <Title
            title="Check your Email"
            desc="Please check your email for the reset link."
          />
          <Typography
            variant="p"
            font="Rubik"
            className="text-justify text-[12px] text-neutral-900"
          >
            You will receive a link in the email you provided. Use this link to
            update your password. <b>{email}</b>. If you don't see the email,
            check your junk, spam, or other folders.
          </Typography>
          <Typography
            variant="p"
            font="Rubik"
            className="flex w-fit text-justify text-[12px] text-neutral-900"
          >
            Didn't receive the email? Click below to resend.
          </Typography>
          <Button
            variant="gradient-yellow"
            className="w-full"
            disabled={resendTimer > 0 || isPending}
            onClick={() => {
              // Kirim ulang reset password link dengan email yang sama
              handleForgotPassword({ email });
              setResendTimer(120); // disable tombol selama 120 detik (2 menit)
            }}
          >
            {resendTimer > 0
              ? `Resend reset password link (${resendTimer}s)`
              : "Resend reset password link"}
          </Button>
        </div>
      )}
    </>
  );
}
