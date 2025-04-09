import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";
import { EmailRequest } from "@/types/auth";

export const useResendEmailMutation = () => {
  const {
    mutate: handleResend,
    isSuccess,
    isPending,
  } = useMutation<null, AxiosError<ApiError>, EmailRequest>({
    mutationFn: async (data) => {
      const res = await api.post<ApiResponse<null>>(
        "/mailer/resend-verify-email",
        data,
      );

      return res.data.data;
    },

    onSuccess: () => {
      toast({
        title: "Resend email successful!",
        description:
          "Please check all your email inbox include junk, spam, or social folder.",
        variant: "default",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data?.message) {
        const code = error.response?.data?.code || "";

        toast({
          title: `Resend email failed - ${code}`,
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

  return { handleResend, isPending, isSuccess };
};
