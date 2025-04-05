import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";
import { ResetPasswordRequest, ResetPasswordResponse } from "@/types/auth";

import { useRouter } from "next/navigation";

export const useResetPasswordMutation = (token: string) => {
  const router = useRouter();

  const {
    mutate: handleResetPassword,
    isSuccess,
    isPending,
  } = useMutation<
    ResetPasswordResponse,
    AxiosError<ApiError>,
    ResetPasswordRequest
  >({
    mutationFn: async (data) => {
      const res = await api.patch<ApiResponse<ResetPasswordResponse>>(
        `/mailer/reset-password?token=${token}`,
        data,
      );

      return res.data.data;
    },

    onSuccess: () => {
      toast({
        title: "Reset password successful!",
        description: "Please wait, redirect to login.",
        variant: "default",
      });

      router.push("/login");
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data?.message) {
        const code = error.response?.data?.code || "";

        toast({
          title: `Reset password failed - ${code}`,
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

  return { handleResetPassword, isPending, isSuccess };
};
