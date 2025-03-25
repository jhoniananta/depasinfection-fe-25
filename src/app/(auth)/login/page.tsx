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
import { toast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Title from "../_components/Title";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function LoginPage() {
  const [show, setShow] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex py-8 flex-col justify-center items-center w-full h-full gap-4">
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Password</FormLabel>
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
            className="text-end text-[12px] sm:text-sm md:text-base lg:text-base text-neutral-900"
          >
            <Link
              href="/forgot-password"
              className="text-cream-600 font-bold hover:underline hover:underline-offset-4"
            >
              Forgot password?
            </Link>
          </Typography>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
      <Typography
        variant="p"
        font="Rubik"
        className="text-center text-[12px] sm:text-sm md:text-base lg:text-base text-neutral-900"
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-cream-600 font-bold hover:underline hover:underline-offset-4"
        >
          Register Now
        </Link>
      </Typography>
    </div>
  );
}

export default LoginPage;
