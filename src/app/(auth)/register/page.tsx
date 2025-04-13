"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import en from "react-phone-number-input/locale/en";
import { z } from "zod";

import Typography from "@/components/Typography";
import { Button as ShadCnButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import withAuth from "@/components/WithAuth";
import Button from "@/components/buttons/Button";
import { RegisterFormSchema } from "@/schemas/auth-schema";
import Link from "next/link";
import Title from "../../../components/Title";
import { useRegistMutation } from "../_hooks/@post/useRegister";
import { useResendEmailMutation } from "../_hooks/@post/useResend";

const steps = [
  { label: "Create Account", value: 0 },
  { label: "Confirmation", value: 50 },
];

export default withAuth(RegisterPage, "auth");
function RegisterPage() {
  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const { handleRegist, isPending, isSuccess } = useRegistMutation();
  const { handleResend, isPending: isResendPending } = useResendEmailMutation();

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    handleRegist({
      email: data.email,
      password: data.password,
      full_name: data.fullname,
      phone_number: data.phoneNumber,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setStep(2);
    }
  }, [isSuccess]);

  // Countdown effect untuk disable tombol resend selama 2 menit
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  const email = form.watch("email");

  const onResend = () => {
    handleResend({ email });
    setResendTimer(150); // disable selama 150 detik (2 menit 30 detik)
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <Typography
          variant="p"
          font="Rubik"
          className="flex w-fit text-[12px] font-semibold text-neutral-500"
        >
          Step: {step} of {steps.length}
        </Typography>

        <div className="flex w-full flex-row gap-2">
          <Typography
            variant="p"
            font="Rubik"
            weight="bold"
            className="flex w-full text-[12px] text-neutral-900"
          >
            {steps[step - 1].label}
          </Typography>
          <div className="flex w-full flex-row items-center justify-center gap-2">
            <Progress value={steps[step - 1].value} className="w-full" />
            <Typography
              variant="p"
              font="Rubik"
              className="flex w-fit text-[12px] font-medium text-neutral-500"
            >
              {steps[step - 1].value}%
            </Typography>
          </div>
        </div>
      </div>

      <Separator />

      {step === 1 ? (
        <>
          <Title
            title="Register Account"
            desc="Please fill this registration so we can know you better!"
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={show ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <ShadCnButton
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShow((prev) => !prev)}
                          tabIndex={-1}
                        >
                          {show ? (
                            <EyeOffIcon className="size-4" />
                          ) : (
                            <EyeIcon className="size-4" />
                          )}
                        </ShadCnButton>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirm ? "text" : "password"}
                          placeholder="Repeat password"
                          {...field}
                        />
                        <ShadCnButton
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowConfirm((prev) => !prev)}
                          tabIndex={-1}
                        >
                          {showConfirm ? (
                            <EyeOffIcon className="size-4" />
                          ) : (
                            <EyeIcon className="size-4" />
                          )}
                        </ShadCnButton>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        defaultCountry="ID"
                        placeholder="Enter your phone number"
                        onChange={field.onChange}
                        labels={en}
                        international
                      />
                    </FormControl>
                    <FormDescription>
                      Use international format (e.g., +62 812 xxxx xxxx)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="gradient-yellow"
                type="submit"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
          <Typography
            variant="p"
            font="Rubik"
            className="text-center text-[12px] text-neutral-900 sm:text-sm md:text-base lg:text-base"
          >
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-cream-600 hover:underline hover:underline-offset-4"
            >
              Login
            </Link>
          </Typography>
        </>
      ) : (
        <div className="w-full space-y-4">
          <Title title="Confirmation" desc="Please check information below!" />
          <Typography
            variant="p"
            font="Rubik"
            className="text-justify text-[12px] text-neutral-900"
          >
            We've sent a confirmation email to <b>{email}</b>. Please check your
            inbox and follow the instructions to verify your account. If you
            don't see the email, check other folders like your junk, spam, or
            social.
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
            onClick={onResend}
            disabled={resendTimer > 0 || isResendPending}
          >
            {resendTimer > 0
              ? `Resend email verification (${resendTimer}s)`
              : "Resend email verification"}
          </Button>
        </div>
      )}
    </>
  );
}
