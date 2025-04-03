"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { LoginFormSchema } from "@/schemas/auth-schema";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Title from "../../../components/Title";
import { useLoginMutation } from "../_hooks/@post/useLogin";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const { handleLogin, isPending, isSuccess } = useLoginMutation();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    handleLogin({
      email: data.email,
      password: data.password,
    });
  }

  if (isSuccess) {
    router.push("/dashboard");
  }

  return (
    <>
      <Title
        title="Log In"
        desc="Please fill this form to access your account"
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
                    <Button
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
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Typography
            variant="p"
            font="Rubik"
            className="text-end text-[12px] text-neutral-900 sm:text-sm md:text-base lg:text-base"
          >
            <Link
              href="/forgot-password"
              className="font-bold text-cream-600 hover:underline hover:underline-offset-4"
            >
              Forgot password?
            </Link>
          </Typography>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
      <Typography
        variant="p"
        font="Rubik"
        className="text-center text-[12px] text-neutral-900 sm:text-sm md:text-base lg:text-base"
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-cream-600 hover:underline hover:underline-offset-4"
        >
          Register Now
        </Link>
      </Typography>
    </>
  );
}

export default LoginPage;
