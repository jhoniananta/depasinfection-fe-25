import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { setToken } from "@/lib/cookies";
import useAuthStore from "@/store/useAuthStore";
import { ApiError, ApiResponse } from "@/types/api";
import { LoginRequest, UserLoginResponse } from "@/types/auth";

export const useUserLoginMutation = () => {
  const login = useAuthStore.useLogin();

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
      setToken(data.token);
      login({ ...data, full_name: data.nama, token: data.token }); // ⬅️ inject ke Zustand

      toast({
        title: "Login successful!",
        description: "Please wait, redirect to your request page.",
        variant: "default",
      });
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
  const login = useAuthStore.useLogin();
  const setLoggingIn = useAuthStore.useSetLoggingIn(); // ✅

  const {
    mutate: handleLogin,
    isSuccess,
    isPending,
  } = useMutation<UserLoginResponse, AxiosError<ApiError>, LoginRequest>({
    mutationFn: async (data) => {
      setLoggingIn(true); // ✅ start login
      const res = await api.post<ApiResponse<UserLoginResponse>>(
        "/admin/auth/login",
        data,
      );
      return res.data.data;
    },

    onSuccess: (data) => {
      setToken(data.token);
      login({ ...data, full_name: data.nama, token: data.token }); // ✅ reset isLoggingIn here
      toast({
        title: "Login successful",
        description: "Please wait, redirect to your admin dashboard.",
        variant: "default",
      });
    },

    onError: (error: AxiosError<ApiError>) => {
      useAuthStore.getState().setLoggingIn(false); // ✅ reset on error
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
