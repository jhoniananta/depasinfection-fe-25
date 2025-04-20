import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { userProfileSchema } from "@/schemas/dashboard-user-schema";
import { ApiError, ApiResponse } from "@/types/api";
import { EditProfileResponse } from "@/types/dashboard-user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { z } from "zod";

type UserProfileType = z.infer<typeof userProfileSchema>;

export const useEditProfileMutation = () => {
  return useMutation<
    ApiResponse<EditProfileResponse>,
    AxiosError<ApiError>,
    UserProfileType
  >({
    mutationFn: async (data) => {
      const res = await api.put<ApiResponse<EditProfileResponse>>(
        "/user/auth/edit",
        data,
      );

      return res.data;
    },

    onSuccess: () => {
      toast({
        title: "Update profile successful!",
        description: "Your profile has been updated.",
        variant: "default",
      });
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data?.message) {
        const code = error.response?.data?.code || "";

        toast({
          title: `Update profile failed - ${code}`,
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
};
