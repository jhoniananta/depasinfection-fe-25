"use client";

import Typography from "@/components/Typography";

import Button from "@/components/buttons/Button";
import { Button as ShadCnButton } from "@/components/ui/button";
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
import { ResetPasswordFormSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Title from "../../../components/Title";
import { useResetPasswordMutation } from "../_hooks/@patch/useResetPassword";

type Props = {
  token?: string;
};

export default function ResetPasswordPage({ token }: Props) {
  const router = useRouter();

  // Always call these hooks
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Always call the mutation hook (pass token || "" so it is always called)
  const { handleResetPassword, isPending } = useResetPasswordMutation(
    token || "",
  );

  // Handle missing token in an effect, and render a fallback UI without skipping hooks
  useEffect(() => {
    if (!token) {
      toast({
        title: "Token not found",
        description: "Please use forgot password to get a verification email.",
        variant: "destructive",
      });
      router.push("/forgot-password");
    }
  }, [token, router]);

  // Setup the form hook
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof ResetPasswordFormSchema>) {
    handleResetPassword({
      password: data.password,
    });
  }

  // Always render a container and then conditionally show content based on token & isPending
  return (
    <>
      {!token || isPending ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-8">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
          <Typography
            variant="p"
            font="Rubik"
            className="text-sm text-muted-foreground"
          >
            {!token ? "Redirecting..." : "Checking your token..."}
          </Typography>
        </div>
      ) : (
        <>
          <Title title="Reset Password" desc="Enter your new password below." />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              {/* New Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <ShadCnButton
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword((prev) => !prev)}
                          tabIndex={-1}
                        >
                          {showPassword ? (
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

              {/* Confirm Password */}
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
                          placeholder="Repeat your password"
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

              <Button
                variant="gradient-yellow"
                type="submit"
                className="w-full"
              >
                {isPending ? "Submitting..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
}
