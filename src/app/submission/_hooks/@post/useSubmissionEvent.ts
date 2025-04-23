"use client";

// hooks/useUDSRCSubmissionMutation.ts
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { removeSessionFile } from "@/lib/utils";
import { ApiError, ApiResponse } from "@/types/api";
import {
  UDSRCSubmissionRequest,
  UDSRCSubmissionResponse,
} from "@/types/event-submission-udsrc";
import { useRouter } from "next/navigation";

export const useUDSRCSubmissionMutation = () => {
  const router = useRouter();

  return useMutation<
    ApiResponse<UDSRCSubmissionResponse>,
    AxiosError<ApiError>,
    UDSRCSubmissionRequest
  >({
    mutationFn: async (data) => {
      const response = await api.post<ApiResponse<UDSRCSubmissionResponse>>(
        "/user/submission/udsrc",
        data,
      );
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Submission successful",
        description: "Your submission has been send!",
        variant: "default",
      });

      removeSessionFile(["posterFile", "validationSheet", "abstractFile"]);

      router.replace("/dashboard/udsrc");
    },

    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};
