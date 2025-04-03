import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";
import { UserLoginResponse, LoginRequest } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { setToken } from "@/lib/cookies";

export const useUserLoginMutation = () => {
  const {
    mutate: handleLogin,
    isSuccess,
    isPending,
  } = useMutation<UserLoginResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: async (data) => {
      const res = await api.post<ApiResponse<UserLoginResponse>>(
        "/user/auth/login",
        data,
      );

      return res.data.data;
    },

    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: "Please wait, redirect to your dashboard.",
        variant: "default",
      });
      setToken(data.token);
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data?.message) {
        const code = error.response?.data?.code || "";

        toast({
          title: `Login failed - ${code}`,
          description: error.response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Sorry, please try again later.",
          variant: "destructive",
        });
      }
    },
  });

  return { handleLogin, isPending, isSuccess };
};

export const useAdminLoginMutation = () => {
  const {
    mutate: handleLogin,
    isSuccess,
    isPending,
  } = useMutation<UserLoginResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: async (data) => {
      const res = await api.post<ApiResponse<UserLoginResponse>>(
        "/admin/auth/login",
        data,
      );

      return res.data.data;
    },

    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: "Please wait, redirect to your admin dashboard.",
        variant: "default",
      });
      setToken(data.token);
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data?.message) {
        const code = error.response?.data?.code || "";

        toast({
          title: `Login failed - ${code}`,
          description: error.response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Sorry, please try again later.",
          variant: "destructive",
        });
      }
    },
  });

  return { handleLogin, isPending, isSuccess };
};
