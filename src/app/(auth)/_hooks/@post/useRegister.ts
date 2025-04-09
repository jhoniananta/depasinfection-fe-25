import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { ApiError } from "@/types/api";
import { UserRegisterRequest, UserRegisterResponse } from "@/types/auth";

export const useRegistMutation = () => {
  const {
    mutate: handleRegist,
    isSuccess,
    isPending,
  } = useMutation<
    UserRegisterResponse,
    AxiosError<ApiError>,
    UserRegisterRequest
  >({
    mutationFn: async (data) => {
      const res = await api.post<UserRegisterResponse>(
        "/user/auth/register",
        data,
      );

      return res.data;
    },

    onSuccess: () => {
      toast({
        title: "Registration successful!",
        description: "Please check your email for verification.",
        variant: "default",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      const code = error.response?.data?.code || "";

      if (error.response?.data?.message) {
        toast({
          title: `Registration failed - ${code}`,
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

  return { handleRegist, isPending, isSuccess };
};
