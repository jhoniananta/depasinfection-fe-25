"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import withAuth from "@/components/WithAuth";
import Button from "@/components/buttons/Button";
import { Button as ShadCnButton } from "@/components/ui/button";
import FormLayout from "@/layouts/FormLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAdminLoginMutation } from "../../../(auth)/_hooks/@post/useLogin";
import Title from "../../../../components/Title";

export default withAuth(AdminLoginPage, "GUEST");
function AdminLoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const { handleLogin, isPending, isSuccess } = useAdminLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.replace("/admin/okgd");
      }, 100); // ⏳ kasih delay supaya Zustand & cookie stabil dulu
    }
  }, [isSuccess, router]);

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

  useEffect(() => {
    if (isSuccess) {
      router.replace("/admin/okgd"); // bisa pakai replace supaya gak bisa balik ke /login
    }
  }, [isSuccess, router]);

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

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant="gradient-yellow"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
}
