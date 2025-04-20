"use client";

import withAuth from "@/components/WithAuth";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Sidebar from "@/layouts/SidebarUser";
import { userProfileSchema } from "@/schemas/dashboard-user-schema";
import { UserProfile } from "@/types/dashboard-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiPencilSquare } from "react-icons/hi2";
import { z } from "zod";
import { useGetProfileQuery } from "../_hooks/@get/useGetProfile";
import { useEditProfileMutation } from "../_hooks/@put/useProfile";

type UserProfileType = z.infer<typeof userProfileSchema>;

export default withAuth(DashboardProfilePage, "USER");
function DashboardProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useGetProfileQuery();

  const form = useForm<UserProfileType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
    },
  });

  const editMutation = useEditProfileMutation();
  // useEffect for defaultValues Form
  useEffect(() => {
    if (data) {
      setFormData(data);
      form.reset(data);
    }
  }, [data]);

  // State to check if it in mobile or desktop view on 1024px
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [formData, setFormData] = useState<UserProfile>({
    account_id: "",
    full_name: "",
    email: "",
    phone_number: "",
    role: "",
    events: [],
  });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const onSubmit = (values: UserProfileType) => {
    if (!data?.email) return;

    const mergedData = {
      ...values,
      email: data.email,
    };

    editMutation.mutate(mergedData, {
      onSuccess: () => {
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ["/user/auth/me"] });
      },
    });
  };

  return (
    <>
      <Sidebar title="Dashboard Profile">
        <section className="min-h-screen w-full overflow-hidden">
          {/* Title Section */}
          <div className="relative z-0 mb-[10vh] bg-neutral-50 md:max-h-[283px]">
            <div className="relative h-full w-full">
              <div className="flex h-full w-full justify-end sm:justify-between">
                <div className="block w-full pt-4 md:pt-8">
                  <div className="flex h-full w-full flex-col items-start justify-center">
                    <div className="pl-6">
                      {/* Hero Typography Start */}
                      <Typography
                        variant="p"
                        weight="bold"
                        className="mb-1 text-[20px] text-gray-600"
                      >
                        Hi, {formData.full_name.split(" ")[0]}, selamat datang
                        di dashboard
                      </Typography>{" "}
                      <Typography
                        variant="h4"
                        weight="bold"
                        className="text-2xl leading-none"
                      >
                        Depa's Infection
                      </Typography>
                    </div>
                    {/* Hero Typography End */}
                  </div>
                </div>
                <div className="hidden h-full w-[70%] items-center justify-center sm:flex">
                  <NextImage
                    alt="hero"
                    width={992}
                    height={283}
                    src="/dashboard/hero-desktop.png"
                    className="h-full w-full object-none"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Content Section */}
          <div className="mx-4 sm:mx-8">
            <Card className="container mx-auto w-full max-w-4xl bg-purple-50 p-4 sm:p-6">
              <CardContent>
                <div className="flex items-start justify-between">
                  <Typography variant="h6" className="text-lg font-bold">
                    Personal{" "}
                    <span className="font-bagnard text-purple-500">
                      Informations
                    </span>
                  </Typography>
                  {!isEditing && (
                    <Button
                      variant="purple"
                      onClick={handleEditClick}
                      className="bg-purple-500 text-white"
                    >
                      <HiPencilSquare className="h-4 w-4 lg:mr-2" />
                      {!isMobile && "Edit Profile"}
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="mt-6 space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Typography variant="p" className="font-semibold">
                                Full Name
                              </Typography>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-purple-200" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormItem>
                        <FormLabel>
                          <Typography variant="p" className="font-semibold">
                            Email
                          </Typography>
                        </FormLabel>
                        <Input
                          value={data?.email || ""}
                          disabled
                          className="bg-purple-200"
                        />
                      </FormItem>

                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <Typography variant="p" className="font-semibold">
                                WhatsApp
                              </Typography>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-purple-200" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-purple-500"
                        variant="purple"
                      >
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div>
                      <Typography variant="p" className="font-semibold">
                        Full Name
                      </Typography>
                      <div className="rounded-lg bg-purple-200 px-4 py-2">
                        {data?.full_name}
                      </div>
                    </div>
                    <div>
                      <Typography variant="p" className="font-semibold">
                        Email
                      </Typography>
                      <div className="rounded-lg bg-purple-200 px-4 py-2">
                        {data?.email}
                      </div>
                    </div>
                    <div>
                      <Typography variant="p" className="font-semibold">
                        WhatsApp
                      </Typography>
                      <div className="rounded-lg bg-purple-200 px-4 py-2">
                        {data?.phone_number}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </Sidebar>
    </>
  );
}
