"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ForgotPasswordFormSchema } from "@/schemas/auth-schema";
import Title from "../../../components/Title";

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof ForgotPasswordFormSchema>) {
    toast({
      title: "Forgot password send successfully!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setSent(true);
  }

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

              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div className="w-full space-y-4">
          <Title
            title="Check your Email"
            desc="Please check information below!"
          />
          <Typography
            variant="p"
            font="Rubik"
            className="text-justify text-[12px] text-neutral-900"
          >
            You will receive a link in the email you provided. Use this link to
            update your password. <b>{email}</b>. If you don't see the email,
            check other places it might be, such as your junk, spam, social, or
            other folders.
          </Typography>
          <Typography
            variant="p"
            font="Rubik"
            className="flex w-fit text-justify text-[12px] text-neutral-900"
          >
            Didn't receive the email? Click below to resend.
          </Typography>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              // fake resend behavior
              toast({ title: "Reset password link resent." });
            }}
          >
            Resend reset password link
          </Button>
        </div>
      )}
    </>
  );
}

export default ForgotPasswordPage;
