import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { ApiError, ApiResponse } from "@/types/api";
import { useRouter } from "next/navigation";

export const useVerifyEmailQuery = (token: string) => {
  const router = useRouter();

  const result = useQuery<null, AxiosError<ApiError>>({
    queryKey: [`/mailer/verify-email?token=${token}`],
    queryFn: async () => {
      const res = await api.get<ApiResponse<null>>(
        `/mailer/verify-email?token=${token}`,
      );
      return res.data.data;
    },
    enabled: !!token, // hanya jalankan query jika token tersedia
  });

  // Handle success outside the query config
  if (result.isSuccess) {
    toast({
      title: "Verify email successful!",
      description: "Let's go to your dashboard!",
      variant: "default",
    });
  }

  // Handle error outside the query config
  if (result.isError) {
    const error = result.error;
    if (error.response?.data?.message) {
      const code = error.response?.data?.code || "";
      toast({
        title: `Verify email failed - ${code}`,
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
    // Jika terjadi error, redirect ke halaman register
    router.push("/register");
  }

  return result;
};
