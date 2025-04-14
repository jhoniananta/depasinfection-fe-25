"use client";

import withAuth from "@/components/WithAuth";

import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Sidebar from "@/layouts/SidebarUser";
import api from "@/lib/api";
import { UserProfile } from "@/types/dashboard-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { useGetProfileQuery } from "../_hooks/@get/useGetProfile";

export default withAuth(DashboardProfilePage, "all");
function DashboardProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useGetProfileQuery();

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

  const updateProfile = async (data: UserProfile): Promise<UserProfile> => {
    const res = await api.put("/user/auth/me", data); // Adjust this endpoint if needed
    return res.data.data;
  };

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/user/auth/me"] });
      setIsEditing(false);
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
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
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <Typography variant="p" className="font-semibold">
                        Full Name
                      </Typography>
                      <Input
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="bg-purple-200"
                      />
                    </div>
                    <div>
                      <Typography variant="p" className="font-semibold">
                        Email
                      </Typography>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-purple-200"
                      />
                    </div>
                    <div>
                      <Typography variant="p" className="font-semibold">
                        WhatsApp
                      </Typography>
                      <Input
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="bg-purple-200"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-purple-500"
                      variant="purple"
                    >
                      Save Changes
                    </Button>
                  </form>
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
